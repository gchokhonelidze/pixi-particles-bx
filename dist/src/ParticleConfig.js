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
        var _a, _b, _c, _d;
        this.id = null;
        this.container = null;
        this.duration = null;
        this.texture = null;
        this.count = 0;
        this.cycleStartedAt = Date.now();
        this.rotateTowardsVelocity = false;
        this.spriteAngle = 0;
        this.simulation = "world";
        this.id = `cfg${(Math.random() + "").substring(2, 8)}`;
        this.container = props.container;
        this.shape = props.shape;
        this.duration = props.duration;
        this.texture = props.texture;
        this.blendMode = props.blendMode;
        this.count = props.count;
        this.lifetime = props.lifetime;
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
        this.rotateTowardsVelocity = (_a = props.rotateTowardsVelocity) !== null && _a !== void 0 ? _a : false;
        this.spriteAngle = (_b = props.spriteAngle) !== null && _b !== void 0 ? _b : 0;
        this.angleOverLifetime = props.angleOverLifetime;
        this.colorOverLifetime = (_c = props.colorOverLifetime) === null || _c === void 0 ? void 0 : _c.map((c) => {
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
        this.simulation = (_d = props.simulation) !== null && _d !== void 0 ? _d : "world";
    }
}
export default ParticleConfig;
