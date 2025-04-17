import { BLEND_MODES, Container, Texture } from "pixi.js";
import Vector2 from "./Vector2";
import { cssColorNames, hex2rgb, rgbStringToRgb, string2hex } from "./ParticleUtills";

export interface TMinMax<T> {
	from: T;
	to: T;
}
function IsTMinMaxArray<T>(v: unknown): v is Array<TMinMax<T>> {
	return Array.isArray(v) && v.length > 0 && typeof v[0] === "object" && v[0] != null && "from" in v[0] && "to" in v[0];
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

class ParticleConfig {
	id: string = null!;
	loop: boolean = true;
	container: Container = null!;
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
	cycleStartedAt: number = Date.now();
	rotateTowardsVelocity: boolean = false;
	spriteAngle: number = 0;
	angleOverLifetime?: Array<number>;
	colorOverLifetime?: Array<[number, number, number]>;
	directions: Array<[number, number]>;
	simulation: "world" | "local" = "world";
	shape?: TShapeRectangle | TCircle | Vector2[];
	_running: boolean = true;
	constructor(props: {
		loop: boolean;
		running?: boolean;
		container: Container;
		duration: number;
		texture: Texture;
		blendMode?: BLEND_MODES;
		count: number;
		lifetime: number | TMinMax<number>;
		direction?: number | TMinMax<number> | Array<number> | Array<TMinMax<number>>;
		alphaOverLifetime?: Array<number>;
		size?: Vector2 | TMinMax<Vector2>;
		scaleOverLifetime?: Array<Vector2>;
		speed?: number;
		accelarationOverLifetime?: Array<number>;
		forceOverLifetime?: Array<Vector2>;
		rotateTowardsVelocity?: boolean;
		spriteAngle?: number;
		angleOverLifetime?: Array<number>;
		colorOverLifetime?: Array<string>;
		simulation?: "world" | "local";
		shape?: TShapeRectangle | TCircle | Vector2[];
	}) {
		this.id = `cfg${(Math.random() + "").substring(2, 8)}`;
		this.loop = props.loop;
		this._running = props.running ?? true;
		this.container = props.container;
		this.shape = props.shape;
		this.duration = props.duration;
		this.texture = props.texture;
		this.blendMode = props.blendMode;
		this.count = props.count;
		this.lifetime = props.lifetime;
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
		this.size = props.size;
		this.scaleOverLifetime = props.scaleOverLifetime;
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
		this.simulation = props.simulation ?? "world";
	}
	_pause = () => {
		this._running = false;
	};
	_resume = () => {
		this._running = true;
	};
}
export default ParticleConfig;
