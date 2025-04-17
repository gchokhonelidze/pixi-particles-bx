import { Container } from "pixi.js";
import Vector2 from "./Vector2";
export declare const randomBetween: (min: number, max: number) => number;
export declare const getGlobalRotation: (c: Container) => number;
export declare const cssColorNames: Record<string, [number, number, number]>;
export declare function rgbStringToRgb(c: string): [number, number, number];
export declare function hex2rgb(hex: number): [number, number, number];
export declare function rgb2hex([r, g, b]: [number, number, number]): number;
export declare function string2hex(color: string): number;
export declare function interpolate<T>(arr: Array<T>, t: number): T;
export declare function arrayFirstOrDefault<T>(arr?: Array<T>, value?: T): T;
export declare function getRandomPointInCircle(cx: number, cy: number, radius: number): {
    x: number;
    y: number;
};
export declare function getRandomPointOnCircumference(cx: number, cy: number, radius: number): {
    x: number;
    y: number;
};
export declare function getRandomPointOnRectangleEdge(x: number, y: number, width: number, height: number): {
    x: number;
    y: number;
};
/**
 * Generate a random point inside a closed polygon shape
 */
export declare function getRandomPointInPolygon(polygon: Vector2[]): Vector2;
