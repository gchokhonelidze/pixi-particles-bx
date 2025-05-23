var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _Particle_onCreate;
import { IsTCircle, IsTShapeRectangle } from "./ParticleConfig";
import Vector2, { IsVector2Array } from "./Vector2";
import { MeshRope, Point, Sprite } from "pixi.js";
import { arrayFirstOrDefault, getRandomPointInCircle, getRandomPointInPolygon, getRandomPointOnCircumference, getRandomPointOnRectangleEdge, randomBetween, ToPixiColor, } from "./ParticleUtills";
class Particle {
    //---
    constructor(props) {
        var _b;
        this.id = null;
        this.cfg = null;
        this.velocity = Vector2.zero();
        this.sprite = null;
        this.createdAt = 0;
        this.lifetime = 0;
        this.createAfter = 0;
        this.expired = false;
        this.expiredAt = 0;
        this.size = Vector2.one();
        this.globalPosition = null;
        this._emittedChild = false;
        this._meshrope = null;
        this.retire = () => {
            var _b, _c;
            this.expired = true;
            this.expiredAt = performance.now();
            _a.on.get(this.cfg.id).delete(this);
            (_b = this.sprite) === null || _b === void 0 ? void 0 : _b.removeFromParent();
            (_c = this._meshrope) === null || _c === void 0 ? void 0 : _c.removeFromParent();
            requestAnimationFrame(() => {
                _a.off.get(this.cfg.id).add(this);
            });
        };
        this.revive = () => {
            _a.off.get(this.cfg.id).delete(this);
            _a.on.get(this.cfg.id).add(this);
            __classPrivateFieldGet(_a, _a, "f", _Particle_onCreate).call(_a, this);
        };
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
            if (props.cfg.trail.color != null)
                this._meshrope.tint = ToPixiColor(props.cfg.trail.color);
            this._meshrope.label = this.id;
            this._meshrope.alpha = (_b = props.cfg.trail.alpha) !== null && _b !== void 0 ? _b : 1;
        }
        __classPrivateFieldGet(_a, _a, "f", _Particle_onCreate).call(_a, this);
    }
}
_a = Particle;
//pooling:
Particle.on = new Map();
Particle.off = new Map();
_Particle_onCreate = { value: (p) => {
        var _b;
        p._emittedChild = false;
        const speed = (_b = p.cfg.speed) !== null && _b !== void 0 ? _b : 0;
        let deltaX = 0;
        let deltaY = 0;
        if (IsTShapeRectangle(p.cfg.shape)) {
            if (p.cfg.shape.onlyEdges) {
                const _point = getRandomPointOnRectangleEdge(0, 0, p.cfg.shape.width, p.cfg.shape.height);
                deltaX = p.cfg.shape.x + _point.x;
                deltaY = p.cfg.shape.y + _point.y;
            }
            else {
                deltaX = p.cfg.shape.x + randomBetween(0, p.cfg.shape.width);
                deltaY = p.cfg.shape.y + randomBetween(0, p.cfg.shape.height);
            }
        }
        else if (IsTCircle(p.cfg.shape)) {
            let _point;
            if (p.cfg.shape.onlyCircumference) {
                _point = getRandomPointOnCircumference(p.cfg.shape.cx, p.cfg.shape.cy, p.cfg.shape.radius);
            }
            else {
                _point = getRandomPointInCircle(p.cfg.shape.cx, p.cfg.shape.cy, p.cfg.shape.radius);
            }
            deltaX = _point.x;
            deltaY = _point.y;
        }
        else if (Array.isArray(p.cfg.shape) && IsVector2Array(p.cfg.shape)) {
            const _point = getRandomPointInPolygon(p.cfg.shape);
            deltaX = _point.x;
            deltaY = _point.y;
        }
        // const parentPosition = p._parent?.sprite.position ?? new Point(0, 0);
        // deltaX += parentPosition.x;
        // deltaY += parentPosition.y;
        let globalPosition = Vector2.zero();
        if (p._particleCreationOptions == null) {
            const _point = new Point();
            globalPosition = Vector2.fromPoint(p.cfg.container.getGlobalPosition(_point, false));
        }
        else {
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
        if (p.cfg.blendMode != null)
            p.sprite.blendMode = p.cfg.blendMode;
        if (p.cfg.size != null) {
            p.size = p.cfg.size instanceof Vector2 ? p.cfg.size : Vector2.randomBetween(p.cfg.size.from, p.cfg.size.to);
            p.sprite.scale = p.size;
        }
        p.sprite.zIndex = p.cfg.zIndex;
        p.cfg.container.addChild(p.sprite);
        if (p._meshrope != null)
            p.cfg.container.addChild(p._meshrope);
        p.expired = false;
        p.createdAt = performance.now();
        p.expiredAt = 0;
        p.lifetime = typeof p.cfg.lifetime === "number" ? p.cfg.lifetime : randomBetween(p.cfg.lifetime.from, p.cfg.lifetime.to);
    } };
Particle.take = (props) => {
    var _b;
    let p = (_b = _a.off.get(props.cfg.id)) === null || _b === void 0 ? void 0 : _b.values().next().value;
    if (p == null) {
        p = new _a(props);
        if (!_a.on.has(p.cfg.id)) {
            _a.on.set(p.cfg.id, new Set());
            _a.off.set(p.cfg.id, new Set());
        }
        _a.on.get(p.cfg.id).add(p);
    }
    else {
        p._particleCreationOptions = props.particleCreationOptions;
        p.revive();
    }
    return p;
};
export default Particle;
