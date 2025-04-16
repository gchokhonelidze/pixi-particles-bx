class CustomTicker {
    constructor() {
        this._running = false;
        this._lastTime = 0;
        this.add = (fn) => this._listeners.add(fn);
        this.remove = (fn) => this._listeners.delete(fn);
        this.stop = () => (this._running = false);
        this._running = false;
        this._lastTime = 0;
        this._listeners = new Set();
        this.start();
    }
    start() {
        if (this._running)
            return;
        this._running = true;
        this._lastTime = performance.now();
        requestAnimationFrame(this._tick.bind(this));
    }
    _tick(currentTime) {
        if (!this._running)
            return;
        const deltaMS = currentTime - this._lastTime;
        this._lastTime = currentTime;
        // 60 FPS base (1000 / 60)
        const deltaTime = deltaMS / (1000 / 60);
        for (const fn of this._listeners)
            fn(deltaTime);
        requestAnimationFrame(this._tick.bind(this));
    }
}
export default CustomTicker;
