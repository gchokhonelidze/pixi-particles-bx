import { BLEND_MODES, Container, Texture } from "pixi.js";
import Vector2 from "./Vector2";
export interface TMinMax<T> {
    from: T;
    to: T;
}
export interface TShapeRectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    onlyEdges: boolean;
}
export declare function IsTShapeRectangle(v: unknown): v is TShapeRectangle;
export interface TCircle {
    cx: number;
    cy: number;
    radius: number;
    onlyCircumference: boolean;
}
export declare function IsTCircle(v: unknown): v is TCircle;
interface TTrailProps {
    texture: Texture;
    blendMode?: BLEND_MODES;
    color?: string;
    alpha?: number;
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
    trail?: TTrailProps;
}
interface TParticleConfigChild extends Omit<TParticleConfigArgs, "loop" | "container" | "simulation" | "duration"> {
}
declare class ParticleConfig {
    id: string;
    zIndex: number;
    loop: boolean;
    container?: Container;
    duration: number;
    texture: Texture;
    blendMode?: BLEND_MODES;
    count: number;
    lifetime: number | TMinMax<number>;
    alphaOverLifetime?: Array<number>;
    size?: Vector2 | TMinMax<Vector2>;
    scaleOverLifetime?: Array<Vector2>;
    speed?: number;
    accelarationOverLifetime?: Array<number>;
    forceOverLifetime?: Array<Vector2>;
    cycleStartedAt: number;
    rotateTowardsVelocity: boolean;
    spriteAngle: number;
    angleOverLifetime?: Array<number>;
    colorOverLifetime?: Array<[number, number, number]>;
    directions: Array<[number, number]>;
    simulation: "world" | "local";
    shape?: TShapeRectangle | TCircle | Vector2[];
    trail?: TTrailProps;
    childStartAfter: number;
    childLoopCount: number;
    childRunEvery: number;
    childRunEveryCount: number;
    children?: ParticleConfig[];
    _running: boolean;
    _parent?: ParticleConfig;
    _createdAt: number;
    constructor(props: TParticleConfigArgs | TParticleConfigChild);
    _pause: () => void;
    _resume: () => void;
}
export default ParticleConfig;
