import { Point } from "pixi.js";
class Vector2 {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    add(v2) {
        return new Vector2(this.x + v2.x, this.y + v2.y);
    }
    minus(v2) {
        return new Vector2(this.x - v2.x, this.y - v2.y);
    }
    mul(x) {
        return new Vector2(this.x * x, this.y * x);
    }
    mulX(v) {
        return new Vector2(this.x * v, this.y);
    }
    mulY(v) {
        return new Vector2(this.x, this.y * v);
    }
    mulV2(v2) {
        return new Vector2(this.x * v2.x, this.y * v2.y);
    }
    static toRadians(x) {
        return (Math.PI / 180) * x;
    }
    static fromRadians(x) {
        return (x / Math.PI) * 180;
    }
    rotate(angle) {
        const radians = Vector2.toRadians(angle);
        return this.rotateRadians(radians);
    }
    rotateRadians(radians) {
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        return new Vector2(cos * this.x - sin * this.y, sin * this.x + cos * this.y);
    }
    angleRadians() {
        return Math.atan2(this.y, this.x); // Returns angle in radians
    }
    angle() {
        return Vector2.fromRadians(this.angleRadians());
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        const length = this.magnitude();
        if (length === 0)
            return new Vector2(0, 0);
        return new Vector2(this.x / length, this.y / length);
    }
    static one() {
        return new Vector2(1, 1);
    }
    static zero() {
        return new Vector2(0, 0);
    }
    static right() {
        return new Vector2(1, 0);
    }
    static left() {
        return new Vector2(-1, 0);
    }
    static up() {
        return new Vector2(0, -1);
    }
    static down() {
        return new Vector2(0, 1);
    }
    toPoint() {
        return new Point(this.x, this.y);
    }
    setX(x) {
        this.x = x;
        return this;
    }
    setY(y) {
        this.y = y;
        return this;
    }
    set(x, y) {
        this.setX(x);
        this.setY(y);
        return this;
    }
}
Vector2.randomBetween = (min, max) => {
    // min and max included
    const r = Math.random();
    const x = Math.floor(r * (max.x - min.x + 1) + min.x);
    const y = Math.floor(r * (max.y - min.y + 1) + min.y);
    return new Vector2(x, y);
};
export default Vector2;
