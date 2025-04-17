import * as PIXI from "pixi.js";
import ParticleConfig from "./ParticleConfig";
import Particle from "./Particle";
import Vector2 from "./Vector2";
import { getGlobalRotation, interpolate, rgb2hex } from "./ParticleUtills";
import CustomTicker from "./CustomTicker";

class PixiParticles {
	static inst: PixiParticles;
	static #Configs: Map<string, ParticleConfig>;
	#particleCreateInterval: Map<string, number>;
	#app: PIXI.Application<PIXI.Renderer>;
	constructor(app: PIXI.Application<PIXI.Renderer>) {
		if (PixiParticles.inst != null) return PixiParticles.inst;
		PixiParticles.inst = this;
		this.#app = app;
		this.#app.ticker.add(this.#ticker);
		this.#particleCreateInterval = new Map();
		PixiParticles.#Configs = new Map();
	}
	#createParticles(config: ParticleConfig) {
		if (!config._running) return;
		for (let i = 0; i < config.count; i++) {
			Particle.take({ cfg: config });
		}
	}
	create = (config: ParticleConfig) => {
		PixiParticles.#Configs.set(config.id, config);
		if (config.loop) {
			this.#particleCreateInterval.set(
				config.id,
				setInterval(() => this.#createParticles(config), config.duration)
			);
		}
		this.#createParticles(config);
	};
	once = (configId: string) => {
		const config = PixiParticles.#Configs.get(configId);
		if (config == null || config.loop) return;
		config._resume();
		this.#createParticles(config);
	};
	pause = (configId: string) => {
		const config = PixiParticles.#Configs.get(configId);
		if (config == null || !config.loop) return;
		config._pause();
		return config;
	};
	resume = (configId: string) => {
		const config = PixiParticles.#Configs.get(configId);
		if (config == null || !config.loop) return;
		config._resume();
		return config;
	};
	toggle = (configId: string) => {
		const config = PixiParticles.#Configs.get(configId);
		if (config == null || !config.loop) return;
		return config._running ? this.pause(configId) : this.resume(configId);
	};
	isRunning = (configId: string) => {
		const config = PixiParticles.#Configs.get(configId);
		if (config == null) return;
		return config._running;
	};

	destroy = (configId: string) => {
		PixiParticles.#Configs.delete(configId);
		const interval = this.#particleCreateInterval.get(configId);
		if (interval == null) return;
		clearInterval(interval);
		requestAnimationFrame(() => {
			const on = Particle.on.get(configId);
			const off = Particle.off.get(configId);
			if (on != null) {
				Particle.on.delete(configId);
				for (let el of on) el.sprite.destroy();
			}
			if (off != null) {
				Particle.off.delete(configId);
				for (let el of off) el.sprite.destroy();
			}
		});
	};

	#ticker = (time: PIXI.Ticker) => {
		const ms = Date.now();
		for (const [cfgId, particleSet] of Particle.on)
			for (const p of particleSet) {
				if (p.expired) continue;
				const expiresAt = p.createdAt + p.lifetime;
				//expire outdated:
				const expired = ms >= expiresAt;
				if (expired) {
					p.retire();
					continue;
				}
				const isLocal = p.cfg.simulation === "local";
				const globalRotationAngle = getGlobalRotation(p.cfg.container);
				const elapsed = ms - p.createdAt;
				const tweenProgress = elapsed > p.lifetime ? 1 : elapsed / p.lifetime;
				if (p.cfg.alphaOverLifetime != null) p.sprite.alpha = interpolate(p.cfg.alphaOverLifetime, tweenProgress);
				if (p.cfg.colorOverLifetime != null) p.sprite.tint = rgb2hex(interpolate(p.cfg.colorOverLifetime, tweenProgress));
				if (p.cfg.scaleOverLifetime != null) p.sprite.scale = interpolate(p.cfg.scaleOverLifetime, tweenProgress).mulV2(p.size);
				if (p.cfg.forceOverLifetime != null) p.velocity = interpolate(p.cfg.forceOverLifetime, tweenProgress).add(p.velocity);
				const acceleration = p.cfg.accelarationOverLifetime != null ? interpolate(p.cfg.accelarationOverLifetime, tweenProgress) : 1;
				const angleVelocity = p.cfg.rotateTowardsVelocity ? p.velocity.angle() : 0;
				const angleOverTime = p.cfg.angleOverLifetime == null ? 0 : interpolate(p.cfg.angleOverLifetime, tweenProgress);
				p.sprite.rotation = Vector2.toRadians(angleVelocity + p.cfg.spriteAngle + angleOverTime);
				if (!isLocal) p.sprite.rotation -= globalRotationAngle;
				const position = isLocal ? p.sprite.position : p.globalPosition;
				position.x += p.velocity.x * acceleration * time.deltaTime;
				position.y += p.velocity.y * acceleration * time.deltaTime;
				const newPosition = isLocal ? position : p.cfg.container.toLocal(position);
				p.sprite.position.set(newPosition.x, newPosition.y);
			}
	};
}
export default PixiParticles;
