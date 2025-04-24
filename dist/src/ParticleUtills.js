import { Point } from "pixi.js";
import Vector2 from "./Vector2";
export const randomBetween = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};
export const randomFloatBetween = (min, max, decimals = 2) => {
    const num = Math.random() * (max - min) + min;
    return Number(num.toFixed(Math.abs(Math.ceil(decimals))));
};
export const getGlobalRotation = (c) => {
    let _c = c;
    let r = c.rotation;
    while (_c.parent != null && c.parent.rotation != null) {
        r -= _c.parent.rotation;
        _c = _c.parent;
    }
    return r;
};
export const cssColorNames = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50],
};
export function movePreservingGlobal(container, newParent) {
    // Step 1: Get the global position
    const _point = new Point();
    const globalPos = container.getGlobalPosition(_point, false);
    // Step 2: Convert global to local of the new parent
    const newLocalPos = newParent.toLocal(globalPos);
    // Step 3: Remove from old parent (optional but usually clean)
    if (container.parent)
        container.parent.removeChild(container);
    // Step 4: Add to new parent
    newParent.addChild(container);
    // Step 5: Set position to match original global position
    container.position.set(newLocalPos.x, newLocalPos.y);
}
export function rgbStringToRgb(c) {
    const match = c.match(/rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+))?\s*\)/i);
    if (!match)
        throw new Error(`Invalid RGB(A) string: ${c}`);
    const r = Number(match[1]);
    const g = Number(match[2]);
    const b = Number(match[3]);
    return [r, g, b];
}
export function hex2rgb(hex) {
    const r = ((hex >> 16) & 0xff) / 255;
    const g = ((hex >> 8) & 0xff) / 255;
    const b = (hex & 0xff) / 255;
    return [r, g, b];
}
export function rgb2hex([r, g, b]) {
    return (r << 16) + (g << 8) + b;
}
export function string2hex(color) {
    return parseInt(color.replace("#", ""), 16);
}
export function ToPixiColor(c) {
    c = c.toLowerCase();
    if (c.startsWith("rgb"))
        return rgbStringToRgb(c);
    else if (c.startsWith("#"))
        return hex2rgb(string2hex(c));
    else if (cssColorNames[c] !== null)
        return cssColorNames[c];
    else
        throw new Error(`invalid color type: ${c}`);
}
function _interpolateNumber(a, b, t) {
    return a * (1 - t) + b * t;
}
function _interpolateVector(a, b, t) {
    return new Vector2(a.x * (1 - t) + b.x * t, a.y * (1 - t) + b.y * t);
}
function _interpolateColor(a, b, t) {
    t = Math.max(0, Math.min(1, t));
    const red = a[0] + (b[0] - a[0]) * t;
    const green = a[1] + (b[1] - a[1]) * t;
    const blue = a[2] + (b[2] - a[2]) * t;
    return [red, green, blue];
}
function _interpolateArray(arr, t, interpolateFn) {
    if (!Array.isArray(arr) || arr.length === 0)
        throw { message: "got empty array" };
    if (arr.length === 1)
        return arr[0];
    if (t <= 0)
        return arr[0];
    if (t >= 1)
        return arr[arr.length - 1];
    const scaledT = t * (arr.length - 1);
    const i = Math.floor(scaledT);
    const localT = scaledT - i;
    const a = arr[i];
    const b = arr[i + 1];
    return interpolateFn(a, b, localT);
}
export function interpolate(arr, t) {
    if (typeof arr[0] === "number") {
        return _interpolateArray(arr, t, _interpolateNumber);
    }
    else if (arr[0] instanceof Vector2) {
        return _interpolateArray(arr, t, _interpolateVector);
    }
    else if (Array.isArray(arr[0]) && typeof arr[0][0] === "number") {
        return _interpolateArray(arr, t, _interpolateColor);
    }
    else {
        throw { message: "Not implemented" };
    }
}
export function arrayFirstOrDefault(arr, value) {
    var _a;
    return (_a = arr === null || arr === void 0 ? void 0 : arr[0]) !== null && _a !== void 0 ? _a : value;
}
export function getRandomPointInCircle(cx, cy, radius) {
    const t = 2 * Math.PI * Math.random(); // Random angle
    const u = Math.random() + Math.random(); // To ensure uniform distribution
    const r = u > 1 ? 2 - u : u; // Convert to uniform radius (avoids clustering in center)
    const x = cx + radius * r * Math.cos(t);
    const y = cy + radius * r * Math.sin(t);
    return { x, y };
}
export function getRandomPointOnCircumference(cx, cy, radius) {
    const angle = 2 * Math.PI * Math.random(); // Random angle from 0 to 2π
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return { x, y };
}
export function getRandomPointOnRectangleEdge(x, y, width, height) {
    const perimeter = 2 * (width + height);
    const edgePoint = Math.random() * perimeter;
    if (edgePoint < width) {
        // Top edge
        return { x: x + edgePoint, y };
    }
    else if (edgePoint < width + height) {
        // Right edge
        return { x: x + width, y: y + (edgePoint - width) };
    }
    else if (edgePoint < 2 * width + height) {
        // Bottom edge
        return { x: x + (2 * width + height - edgePoint), y: y + height };
    }
    else {
        // Left edge
        return { x, y: y + (perimeter - edgePoint) };
    }
}
/**
 * Calculate the area of a triangle using the shoelace formula
 */
function triangleArea(a, b, c) {
    return Math.abs((a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)) / 2);
}
/**
 * Generate a random point inside a triangle using barycentric coordinates
 */
function randomPointInTriangle(a, b, c) {
    let r1 = Math.random();
    let r2 = Math.random();
    if (r1 + r2 > 1) {
        r1 = 1 - r1;
        r2 = 1 - r2;
    }
    const x = a.x + r1 * (b.x - a.x) + r2 * (c.x - a.x);
    const y = a.y + r1 * (b.y - a.y) + r2 * (c.y - a.y);
    return new Vector2(x, y);
}
/**
 * Triangulate the polygon (assumes the polygon is simple and convex)
 */
function triangulatePolygon(vertices) {
    const triangles = [];
    for (let i = 1; i < vertices.length - 1; i++) {
        triangles.push([vertices[0], vertices[i], vertices[i + 1]]);
    }
    return triangles;
}
/**
 * Generate a random point inside a closed polygon shape
 */
export function getRandomPointInPolygon(polygon) {
    const triangles = triangulatePolygon(polygon);
    const areas = triangles.map(([a, b, c]) => triangleArea(a, b, c));
    const totalArea = areas.reduce((sum, area) => sum + area, 0);
    let pick = Math.random() * totalArea;
    for (let i = 0; i < triangles.length; i++) {
        if (pick < areas[i]) {
            const [a, b, c] = triangles[i];
            return randomPointInTriangle(a, b, c);
        }
        pick -= areas[i];
    }
    // Fallback (should never hit)
    return new Vector2(0, 0);
}
