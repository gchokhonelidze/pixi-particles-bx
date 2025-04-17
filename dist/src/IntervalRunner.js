class IntervalRunner {
    constructor(callback, intervalMs, maxCount) {
        this.currentCount = 0;
        this.intervalId = null;
        this.callback = callback;
        this.intervalMs = intervalMs;
        this.maxCount = maxCount;
    }
    start() {
        if (this.intervalId)
            return; // already running
        this.callback(this.currentCount);
        this.currentCount++;
        if (this.currentCount < this.maxCount) {
            this.intervalId = setInterval(() => {
                this.callback(this.currentCount);
                this.currentCount++;
                if (this.currentCount >= this.maxCount) {
                    this.stop();
                }
            }, this.intervalMs);
        }
    }
    stop() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
export default IntervalRunner;
