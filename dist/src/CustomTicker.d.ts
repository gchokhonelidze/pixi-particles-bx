declare class CustomTicker {
    _running: boolean;
    _lastTime: number;
    _listeners: Set<(v: number) => unknown>;
    constructor();
    add: (fn: (v: number) => unknown) => Set<(v: number) => unknown>;
    remove: (fn: (v: number) => unknown) => boolean;
    start(): void;
    stop: () => boolean;
    _tick(currentTime: number): void;
}
export default CustomTicker;
