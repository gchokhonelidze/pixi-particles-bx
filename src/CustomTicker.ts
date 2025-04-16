class CustomTicker {
	_running: boolean = false;
	_lastTime: number = 0;
	_listeners: Set<(v: number) => unknown>;
	constructor() {
		this._running = false;
		this._lastTime = 0;
		this._listeners = new Set();
		this.start();
	}
	add = (fn: (v: number) => unknown) => this._listeners.add(fn);
	remove = (fn: (v: number) => unknown) => this._listeners.delete(fn);
	start() {
		if (this._running) return;
		this._running = true;
		this._lastTime = performance.now();
		requestAnimationFrame(this._tick.bind(this));
	}
	stop = () => (this._running = false);
	_tick(currentTime: number) {
		if (!this._running) return;
		const deltaMS = currentTime - this._lastTime;
		this._lastTime = currentTime;
		// 60 FPS base (1000 / 60)
		const deltaTime = deltaMS / (1000 / 60);
		for (const fn of this._listeners) fn(deltaTime);
		requestAnimationFrame(this._tick.bind(this));
	}
}
export default CustomTicker;
