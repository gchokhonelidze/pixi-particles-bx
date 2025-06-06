import ParticleConfig, { IsTCircle, IsTShapeRectangle } from "./ParticleConfig";
import Vector2, { IsVector2Array } from "./Vector2";
import { Container, MeshRope, Point, Sprite } from "pixi.js";
import {
	arrayFirstOrDefault,
	getRandomPointInCircle,
	getRandomPointInPolygon,
	getRandomPointOnCircumference,
	getRandomPointOnRectangleEdge,
	randomBetween,
	ToPixiColor,
} from "./ParticleUtills";
export interface TParticleCreationOptions {
	position: Vector2;
	container: Container;
}
interface TParticle {
	cfg: ParticleConfig;
	particleCreationOptions?: TParticleCreationOptions;
}
class Particle {
	id: string = null!;
	cfg: ParticleConfig = null!;
	velocity: Vector2 = Vector2.zero();
	sprite: Sprite = null!;
	createdAt: number = 0;
	lifetime: number = 0;
	createAfter: number = 0;
	expired: boolean = false;
	expiredAt: number = 0;
	size: Vector2 = Vector2.one();
	globalPosition: Vector2 = null!;
	_particleCreationOptions?: TParticleCreationOptions;
	_emittedChild: boolean = false;
	_meshrope?: MeshRope = null;
	_meshropePoints: Point[];

	//pooling:
	static on: Map<string, Set<Particle>> = new Map();
	static off: Map<string, Set<Particle>> = new Map();
	//---

	constructor(props: TParticle) {
		this.cfg = props.cfg;
		this.id = `${props.cfg.id}_${(Math.random() + "").substring(2, 12)}`;
		const sprite = Sprite.from(props.cfg.texture);
		sprite.label = this.id;
		sprite.anchor.set(0.5, 0.5);
		this.sprite = sprite;
		this._particleCreationOptions = props.particleCreationOptions;
		if (props.cfg.trail != null) {
			this._meshropePoints = Array.from({ length: 10 }, () => new Point(0, 0));
			this._meshrope = new MeshRope({ texture: props.cfg.trail.texture, points: this._meshropePoints });
			this._meshrope.blendMode = props.cfg.trail.blendMode;
			if (props.cfg.trail.color != null) this._meshrope.tint = ToPixiColor(props.cfg.trail.color);
			this._meshrope.label = this.id;
			this._meshrope.alpha = props.cfg.trail.alpha ?? 1;
		}
		Particle.#onCreate(this);
	}
	static #onCreate = (p: Particle) => {
		p._emittedChild = false;
		const speed = p.cfg.speed ?? 0;
		let deltaX = 0;
		let deltaY = 0;

		if (IsTShapeRectangle(p.cfg.shape)) {
			if (p.cfg.shape.onlyEdges) {
				const _point = getRandomPointOnRectangleEdge(0, 0, p.cfg.shape.width, p.cfg.shape.height);
				deltaX = p.cfg.shape.x + _point.x;
				deltaY = p.cfg.shape.y + _point.y;
			} else {
				deltaX = p.cfg.shape.x + randomBetween(0, p.cfg.shape.width);
				deltaY = p.cfg.shape.y + randomBetween(0, p.cfg.shape.height);
			}
		} else if (IsTCircle(p.cfg.shape)) {
			let _point: {
				x: number;
				y: number;
			};
			if (p.cfg.shape.onlyCircumference) {
				_point = getRandomPointOnCircumference(p.cfg.shape.cx, p.cfg.shape.cy, p.cfg.shape.radius);
			} else {
				_point = getRandomPointInCircle(p.cfg.shape.cx, p.cfg.shape.cy, p.cfg.shape.radius);
			}
			deltaX = _point.x;
			deltaY = _point.y;
		} else if (Array.isArray(p.cfg.shape) && IsVector2Array(p.cfg.shape)) {
			const _point = getRandomPointInPolygon(p.cfg.shape);
			deltaX = _point.x;
			deltaY = _point.y;
		}
		// const parentPosition = p._parent?.sprite.position ?? new Point(0, 0);
		// deltaX += parentPosition.x;
		// deltaY += parentPosition.y;
		let globalPosition: Vector2 = Vector2.zero();
		if (p._particleCreationOptions == null) {
			const _point = new Point();
			globalPosition = Vector2.fromPoint(p.cfg.container.getGlobalPosition(_point, false));
		} else {
			p.cfg.container = p._particleCreationOptions.container;
			globalPosition = p._particleCreationOptions.position;
		}
		globalPosition.x += deltaX;
		globalPosition.y += deltaY;
		p.globalPosition = new Vector2(globalPosition.x, globalPosition.y);
		p.sprite.x = deltaX;
		p.sprite.y = deltaY;
		if (Array.isArray(p._meshropePoints)) {
			p._meshropePoints.forEach((el, i) => {
				el.x = p.sprite.x * 10;
				el.y = p.sprite.y * 10;
			});
		}

		const direction = p.cfg.directions[randomBetween(0, p.cfg.directions.length - 1)];
		p.velocity = Vector2.one()
			.normalize()
			.rotate(randomBetween(direction[0], direction[1]) - 45)
			.mul(speed);
		p.sprite.alpha = arrayFirstOrDefault(p.cfg.alphaOverLifetime, 1);
		if (p.cfg.blendMode != null) p.sprite.blendMode = p.cfg.blendMode;
		if (p.cfg.size != null) {
			p.size = p.cfg.size instanceof Vector2 ? p.cfg.size : Vector2.randomBetween(p.cfg.size.from, p.cfg.size.to);
			p.sprite.scale = p.size;
		}
		p.sprite.zIndex = p.cfg.zIndex;
		p.cfg.container.addChild(p.sprite);
		if (p._meshrope != null) p.cfg.container.addChild(p._meshrope);
		p.expired = false;
		p.createdAt = performance.now();
		p.expiredAt = 0;
		p.lifetime = typeof p.cfg.lifetime === "number" ? p.cfg.lifetime : randomBetween(p.cfg.lifetime.from, p.cfg.lifetime.to);
	};
	retire = () => {
		this.expired = true;
		this.expiredAt = performance.now();
		Particle.on.get(this.cfg.id).delete(this);
		this.sprite?.removeFromParent();
		this._meshrope?.removeFromParent();
		requestAnimationFrame(() => {
			Particle.off.get(this.cfg.id).add(this);
		});
	};
	revive = () => {
		Particle.off.get(this.cfg.id).delete(this);
		Particle.on.get(this.cfg.id).add(this);
		Particle.#onCreate(this);
	};
	static take = (props: TParticle) => {
		let p = Particle.off.get(props.cfg.id)?.values().next().value as Particle | null;
		if (p == null) {
			p = new Particle(props);
			if (!Particle.on.has(p.cfg.id)) {
				Particle.on.set(p.cfg.id, new Set());
				Particle.off.set(p.cfg.id, new Set());
			}
			Particle.on.get(p.cfg.id).add(p);
		} else {
			p._particleCreationOptions = props.particleCreationOptions;
			p.revive();
		}
		return p;
	};
}
export default Particle;
