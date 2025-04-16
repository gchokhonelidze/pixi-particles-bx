var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PixiParticles_instances, _PixiParticles_particleCreateInterval, _PixiParticles_app, _PixiParticles_createParticles, _PixiParticles_ticker;
import Particle from "./Particle";
import Vector2 from "./Vector2";
import { getGlobalRotation, interpolate, rgb2hex } from "./ParticleUtills";
class PixiParticles {
    constructor(app) {
        _PixiParticles_instances.add(this);
        _PixiParticles_particleCreateInterval.set(this, void 0);
        _PixiParticles_app.set(this, void 0);
        this.create = (config) => {
            __classPrivateFieldGet(this, _PixiParticles_particleCreateInterval, "f").set(config.id, setInterval(() => __classPrivateFieldGet(this, _PixiParticles_instances, "m", _PixiParticles_createParticles).call(this, config), config.duration));
            __classPrivateFieldGet(this, _PixiParticles_instances, "m", _PixiParticles_createParticles).call(this, config);
        };
        this.destroy = (configId) => {
            const interval = __classPrivateFieldGet(this, _PixiParticles_particleCreateInterval, "f").get(configId);
            if (interval == null)
                return;
            clearInterval(interval);
            requestAnimationFrame(() => {
                const on = Particle.on.get(configId);
                const off = Particle.off.get(configId);
                if (on != null) {
                    Particle.on.delete(configId);
                    for (let el of on)
                        el.sprite.destroy();
                }
                if (off != null) {
                    Particle.off.delete(configId);
                    for (let el of off)
                        el.sprite.destroy();
                }
            });
        };
        _PixiParticles_ticker.set(this, (time) => {
            const ms = Date.now();
            for (const [cfgId, particleSet] of Particle.on)
                for (const p of particleSet) {
                    if (p.expired)
                        continue;
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
                    if (p.cfg.alphaOverLifetime != null)
                        p.sprite.alpha = interpolate(p.cfg.alphaOverLifetime, tweenProgress);
                    if (p.cfg.colorOverLifetime != null)
                        p.sprite.tint = rgb2hex(interpolate(p.cfg.colorOverLifetime, tweenProgress));
                    if (p.cfg.scaleOverLifetime != null)
                        p.sprite.scale = interpolate(p.cfg.scaleOverLifetime, tweenProgress).mulV2(p.size);
                    if (p.cfg.forceOverLifetime != null)
                        p.velocity = interpolate(p.cfg.forceOverLifetime, tweenProgress).add(p.velocity);
                    const acceleration = p.cfg.accelarationOverLifetime != null ? interpolate(p.cfg.accelarationOverLifetime, tweenProgress) : 1;
                    const angleVelocity = p.cfg.rotateTowardsVelocity ? p.velocity.angle() : 0;
                    const angleOverTime = p.cfg.angleOverLifetime == null ? 0 : interpolate(p.cfg.angleOverLifetime, tweenProgress);
                    p.sprite.rotation = Vector2.toRadians(angleVelocity + p.cfg.spriteAngle + angleOverTime);
                    if (!isLocal)
                        p.sprite.rotation -= globalRotationAngle;
                    const position = isLocal ? p.sprite.position : p.globalPosition;
                    position.x += p.velocity.x * acceleration * time.deltaTime;
                    position.y += p.velocity.y * acceleration * time.deltaTime;
                    const newPosition = isLocal ? position : p.cfg.container.toLocal(position);
                    p.sprite.position.set(newPosition.x, newPosition.y);
                }
        });
        if (PixiParticles.inst != null)
            return PixiParticles.inst;
        PixiParticles.inst = this;
        __classPrivateFieldSet(this, _PixiParticles_app, app, "f");
        __classPrivateFieldGet(this, _PixiParticles_app, "f").ticker.add(__classPrivateFieldGet(this, _PixiParticles_ticker, "f"));
        __classPrivateFieldSet(this, _PixiParticles_particleCreateInterval, new Map(), "f");
    }
}
_PixiParticles_particleCreateInterval = new WeakMap(), _PixiParticles_app = new WeakMap(), _PixiParticles_ticker = new WeakMap(), _PixiParticles_instances = new WeakSet(), _PixiParticles_createParticles = function _PixiParticles_createParticles(config) {
    for (let i = 0; i < config.count; i++) {
        Particle.take({ cfg: config });
    }
};
export default PixiParticles;
