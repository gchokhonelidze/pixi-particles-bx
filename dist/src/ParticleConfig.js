import { cssColorNames, hex2rgb, rgbStringToRgb, string2hex } from "./ParticleUtills";
function IsTMinMaxArray(v) {
    return Array.isArray(v) && v.length > 0 && typeof v[0] === "object" && v[0] != null && "from" in v[0] && "to" in v[0];
}
export function IsTShapeRectangle(v) {
    return typeof v === "object" && v != null && "width" in v && "height" in v && "onlyEdges" in v;
}
export function IsTCircle(v) {
    return typeof v === "object" && v != null && "cx" in v && "cy" in v && "radius" in v && "onlyCircumference" in v;
}
class ParticleConfig {
    constructor(props) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.id = null;
        this.loop = true;
        this.container = null;
        this.duration = null;
        this.texture = null;
        this.count = 0;
        this.cycleStartedAt = Date.now();
        this.rotateTowardsVelocity = false;
        this.spriteAngle = 0;
        this.simulation = "world";
        this.childStartAfter = 0;
        this.childLoopCount = 1;
        //--
        this._running = true;
        this._pause = () => {
            this._running = false;
        };
        this._resume = () => {
            this._running = true;
        };
        this.id = `cfg${(Math.random() + "").substring(2, 8)}`;
        this._createdAt = Date.now();
        this.loop = "loop" in props ? props.loop : false;
        this._running = (_a = props.running) !== null && _a !== void 0 ? _a : true;
        this.container = props.container;
        this.shape = props.shape;
        this.duration = props.duration;
        this.texture = props.texture;
        this.blendMode = props.blendMode;
        this.count = props.count;
        this.lifetime = props.lifetime;
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
        this.size = props.size;
        this.scaleOverLifetime = props.scaleOverLifetime;
        this.speed = props.speed;
        this.accelarationOverLifetime = props.accelarationOverLifetime;
        this.forceOverLifetime = props.forceOverLifetime;
        this.rotateTowardsVelocity = (_c = props.rotateTowardsVelocity) !== null && _c !== void 0 ? _c : false;
        this.spriteAngle = (_d = props.spriteAngle) !== null && _d !== void 0 ? _d : 0;
        this.angleOverLifetime = props.angleOverLifetime;
        this.colorOverLifetime = (_e = props.colorOverLifetime) === null || _e === void 0 ? void 0 : _e.map((c) => {
            c = c.toLowerCase();
            if (c.startsWith("rgb"))
                return rgbStringToRgb(c);
            else if (c.startsWith("#"))
                return hex2rgb(string2hex(c));
            else if (cssColorNames[c] !== null)
                return cssColorNames[c];
            else
                throw new Error(`invalid color type: ${c}`);
        });
        this.simulation = "simulation" in props ? (_f = props.simulation) !== null && _f !== void 0 ? _f : "world" : "world";
        this.children = "children" in props ? (_g = props.children) === null || _g === void 0 ? void 0 : _g.map((el) => new ParticleConfig(el)) : null;
        if ("childStartAfter" in props)
            this.childStartAfter = props.childStartAfter;
        if ("childLoopCount" in props)
            this.childLoopCount = props.childLoopCount > 1 ? Math.ceil(props.childLoopCount) : 1;
    }
}
export default ParticleConfig;
