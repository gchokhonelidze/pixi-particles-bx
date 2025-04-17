declare class IntervalRunner {
    private callback;
    private intervalMs;
    private maxCount;
    private currentCount;
    private intervalId;
    constructor(callback: (iteration: number) => void, intervalMs: number, maxCount: number);
    start(): void;
    stop(): void;
}
export default IntervalRunner;
