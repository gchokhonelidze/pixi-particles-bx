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
declare class ParticleConfig {
    id: string;
    container: Container;
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
    constructor(props: {
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
    });
}
export default ParticleConfig;
