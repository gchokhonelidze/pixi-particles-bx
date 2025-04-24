import { Rectangle } from "pixi.js";
import Vector2, { IsVector2 } from "./Vector2";
import { ToPixiColor } from "./ParticleUtills";
function IsMinMax(v) {
    return typeof v === "object" && v != null && "from" in v && "to" in v;
}
function IsTMinMaxArray(v) {
    return Array.isArray(v) && v.length > 0 && IsMinMax(v[0]);
}
export function IsTShapeRectangle(v) {
    return typeof v === "object" && v != null && "width" in v && "height" in v && "onlyEdges" in v;
}
export function IsTCircle(v) {
    return typeof v === "object" && v != null && "cx" in v && "cy" in v && "radius" in v && "onlyCircumference" in v;
}
class ParticleConfig {
    constructor(props) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.id = null;
        this.loop = true;
        this.container = null;
        this.duration = null;
        this.texture = null;
        this.count = 0;
        this.cycleStartedAt = performance.now();
        this.rotateTowardsVelocity = false;
        this.spriteAngle = 0;
        this.simulation = "world";
        this.childStartAfter = 0;
        this.childLoopCount = 1;
        this.childRunEvery = 0;
        this.childRunEveryCount = 1;
        //--
        this._running = true;
        this._pause = () => {
            this._running = false;
        };
        this._resume = () => {
            this._running = true;
        };
        this.id = `cfg${(Math.random() + "").substring(2, 8)}`;
        this._createdAt = performance.now();
        this.loop = "loop" in props ? props.loop : false;
        this._running = (_a = props.running) !== null && _a !== void 0 ? _a : true;
        this.container = "container" in props ? props.container : null;
        if (this.container) {
            this.container.boundsArea = new Rectangle(0, 0, 0, 0);
        }
        this.shape = props.shape;
        this.duration = "duration" in props ? props.duration : 0;
        this.texture = props.texture;
        this.blendMode = props.blendMode;
        this.count = props.count;
        this.lifetime = props.lifetime;
        this.trail = props.trail;
        this.zIndex = (_b = props.zIndex) !== null && _b !== void 0 ? _b : 0;
        this.directions = [];
        if (props.direction == null)
            this.directions.push([0, 359]);
        else if (typeof props.direction === "number")
            this.directions.push([props.direction, props.direction]);
        else if (typeof props.direction === "object" && "from" in props.direction && "to" in props.direction)
            this.directions.push([props.direction.from, props.direction.to]);
        else if (Array.isArray(props.direction)) {
            let arr = null;
            if (typeof props.direction[0] === "number") {
                arr = props.direction.map((el) => [el, el]);
            }
            else if (IsTMinMaxArray(props.direction)) {
                arr = props.direction.map((el) => [el.from, el.to]);
            }
            this.directions.push(...arr);
        }
        this.alphaOverLifetime = props.alphaOverLifetime;
        if (typeof props.size === "number") {
            this.size = Vector2.uniform(props.size);
        }
        else if (IsMinMax(props.size) && typeof props.size.from === "number") {
            this.size = { from: Vector2.uniform(props.size.from), to: Vector2.uniform(props.size.to) };
        }
        else if (IsMinMax(props.size) && IsVector2(props.size.from)) {
            this.size = props.size;
        }
        else if (IsVector2(props.size)) {
            this.size = props.size;
        }
        this.scaleOverLifetime = (_c = props.scaleOverLifetime) === null || _c === void 0 ? void 0 : _c.map((el) => {
            if (typeof el === "number")
                return new Vector2(el, el);
            else
                return el;
        });
        this.speed = props.speed;
        this.accelarationOverLifetime = props.accelarationOverLifetime;
        this.forceOverLifetime = props.forceOverLifetime;
        this.rotateTowardsVelocity = (_d = props.rotateTowardsVelocity) !== null && _d !== void 0 ? _d : false;
        this.spriteAngle = (_e = props.spriteAngle) !== null && _e !== void 0 ? _e : 0;
        this.angleOverLifetime = props.angleOverLifetime;
        this.colorOverLifetime = (_f = props.colorOverLifetime) === null || _f === void 0 ? void 0 : _f.map((c) => ToPixiColor(c));
        this.simulation = "simulation" in props ? (_g = props.simulation) !== null && _g !== void 0 ? _g : "world" : "world";
        this.children = "children" in props ? (_h = props.children) === null || _h === void 0 ? void 0 : _h.map((el) => new ParticleConfig(el)) : null;
        this.childStartAfter = props.childStartAfter;
        this.childLoopCount = props.childLoopCount > 1 ? Math.ceil(props.childLoopCount) : 1;
        this.childRunEvery = props.childRunEvery > 0 ? Math.ceil(props.childRunEvery) : 0;
        this.childRunEveryCount = props.childRunEveryCount > 0 ? Math.ceil(props.childRunEveryCount) : 1;
    }
}
export default ParticleConfig;
