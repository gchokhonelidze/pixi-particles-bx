import { BLEND_MODES, Container, Texture } from "pixi.js";
import Vector2, { IsVector2 } from "./Vector2";
import { cssColorNames, hex2rgb, rgbStringToRgb, string2hex } from "./ParticleUtills";

export interface TMinMax<T> {
	from: T;
	to: T;
}
function IsMinMax<T>(v: unknown): v is TMinMax<T> {
	return typeof v === "object" && v != null && "from" in v && "to" in v;
}
function IsTMinMaxArray<T>(v: unknown): v is Array<TMinMax<T>> {
	return Array.isArray(v) && v.length > 0 && IsMinMax(v[0]);
}
export interface TShapeRectangle {
	x: number;
	y: number;
	width: number;
	height: number;
	onlyEdges: boolean;
}
export function IsTShapeRectangle(v: unknown): v is TShapeRectangle {
	return typeof v === "object" && v != null && "width" in v && "height" in v && "onlyEdges" in v;
}
export interface TCircle {
	cx: number;
	cy: number;
	radius: number;
	onlyCircumference: boolean;
}
export function IsTCircle(v: unknown): v is TCircle {
	return typeof v === "object" && v != null && "cx" in v && "cy" in v && "radius" in v && "onlyCircumference" in v;
}
interface TParticleConfigArgs {
	loop: boolean;
	container: Container;
	duration: number;
	texture: Texture;
	count: number;
	lifetime: number | TMinMax<number>;
	blendMode?: BLEND_MODES;
	running?: boolean;
	direction?: number | TMinMax<number> | Array<number> | Array<TMinMax<number>>;
	alphaOverLifetime?: Array<number>;
	size?: number | TMinMax<number> | Vector2 | TMinMax<Vector2>;
	scaleOverLifetime?: Array<Vector2> | Array<number>;
	speed?: number;
	accelarationOverLifetime?: Array<number>;
	forceOverLifetime?: Array<Vector2>;
	rotateTowardsVelocity?: boolean;
	spriteAngle?: number;
	angleOverLifetime?: Array<number>;
	colorOverLifetime?: Array<string>;
	simulation?: "world" | "local";
	shape?: TShapeRectangle | TCircle | Vector2[];
	childStartAfter?: number;
	childLoopCount?: number;
	childRunEvery?: number;
	childRunEveryCount?: number;
	children?: TParticleConfigChild[];
	zIndex?: number;
}
interface TParticleConfigChild extends Omit<TParticleConfigArgs, "loop" | "container" | "simulation" | "duration"> {}
class ParticleConfig {
	id: string = null!;
	zIndex: number;
	loop: boolean = true;
	container?: Container = null!;
	duration: number = null!;
	texture: Texture = null!;
	blendMode?: BLEND_MODES;
	count: number = 0;
	lifetime: number | TMinMax<number>;
	alphaOverLifetime?: Array<number>;
	size?: Vector2 | TMinMax<Vector2>; //starting scale
	scaleOverLifetime?: Array<Vector2>;
	speed?: number;
	accelarationOverLifetime?: Array<number>;
	forceOverLifetime?: Array<Vector2>;
	cycleStartedAt: number = performance.now();
	rotateTowardsVelocity: boolean = false;
	spriteAngle: number = 0;
	angleOverLifetime?: Array<number>;
	colorOverLifetime?: Array<[number, number, number]>;
	directions: Array<[number, number]>;
	simulation: "world" | "local" = "world";
	shape?: TShapeRectangle | TCircle | Vector2[];
	childStartAfter: number = 0;
	childLoopCount: number = 1;
	childRunEvery: number = 0;
	childRunEveryCount: number = 1;
	children?: ParticleConfig[];
	//--
	_running: boolean = true;
	_parent?: ParticleConfig;
	_createdAt: number;
	constructor(props: TParticleConfigArgs | TParticleConfigChild) {
		this.id = `cfg${(Math.random() + "").substring(2, 8)}`;
		this._createdAt = performance.now();
		this.loop = "loop" in props ? props.loop : false;
		this._running = props.running ?? true;
		this.container = "container" in props ? props.container : null;
		this.shape = props.shape;
		this.duration = "duration" in props ? props.duration : 0;
		this.texture = props.texture;
		this.blendMode = props.blendMode;
		this.count = props.count;
		this.lifetime = props.lifetime;
		this.zIndex = props.zIndex ?? 0;
		this.directions = [];
		if (props.direction == null) this.directions.push([0, 359]);
		else if (typeof props.direction === "number") this.directions.push([props.direction, props.direction]);
		else if (typeof props.direction === "object" && "from" in props.direction && "to" in props.direction)
			this.directions.push([props.direction.from, props.direction.to]);
		else if (Array.isArray(props.direction)) {
			let arr: Array<[number, number]> = null!;
			if (typeof props.direction[0] === "number") {
				arr = (props.direction as Array<number>).map((el) => [el, el]);
			} else if (IsTMinMaxArray(props.direction)) {
				arr = props.direction.map((el) => [el.from, el.to]);
			}
			this.directions.push(...arr);
		}
		this.alphaOverLifetime = props.alphaOverLifetime;
		if (typeof props.size === "number") {
			this.size = Vector2.uniform(props.size);
		} else if (IsMinMax<number>(props.size) && typeof props.size.from === "number") {
			this.size = { from: Vector2.uniform(props.size.from), to: Vector2.uniform(props.size.to) } as TMinMax<Vector2>;
		} else if (IsMinMax<Vector2>(props.size) && IsVector2(props.size.from)) {
			this.size = props.size;
		} else if (IsVector2(props.size)) {
			this.size = props.size;
		}
		this.scaleOverLifetime = props.scaleOverLifetime?.map((el) => {
			if (typeof el === "number") return new Vector2(el, el);
			else return el;
		});
		this.speed = props.speed;
		this.accelarationOverLifetime = props.accelarationOverLifetime;
		this.forceOverLifetime = props.forceOverLifetime;
		this.rotateTowardsVelocity = props.rotateTowardsVelocity ?? false;
		this.spriteAngle = props.spriteAngle ?? 0;
		this.angleOverLifetime = props.angleOverLifetime;
		this.colorOverLifetime = props.colorOverLifetime?.map((c) => {
			c = c.toLowerCase();
			if (c.startsWith("rgb")) return rgbStringToRgb(c);
			else if (c.startsWith("#")) return hex2rgb(string2hex(c));
			else if (cssColorNames[c] !== null) return cssColorNames[c];
			else throw new Error(`invalid color type: ${c}`);
		});
		this.simulation = "simulation" in props ? props.simulation ?? "world" : "world";
		this.children = "children" in props ? props.children?.map((el) => new ParticleConfig(el)) : null;
		this.childStartAfter = props.childStartAfter;
		this.childLoopCount = props.childLoopCount > 1 ? Math.ceil(props.childLoopCount) : 1;
		this.childRunEvery = props.childRunEvery > 0 ? Math.ceil(props.childRunEvery) : 0;
		this.childRunEveryCount = props.childRunEveryCount > 0 ? Math.ceil(props.childRunEveryCount) : 1;
	}
	_pause = () => {
		this._running = false;
	};
	_resume = () => {
		this._running = true;
	};
}
export default ParticleConfig;
