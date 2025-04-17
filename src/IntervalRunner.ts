class IntervalRunner {
	private callback: (iteration: number) => void;
	private intervalMs: number;
	private maxCount: number;
	private currentCount: number = 0;
	private intervalId: ReturnType<typeof setInterval> | null = null;
	constructor(callback: (iteration: number) => void, intervalMs: number, maxCount: number) {
		this.callback = callback;
		this.intervalMs = intervalMs;
		this.maxCount = maxCount;
	}
	public start(): void {
		if (this.intervalId) return; // already running

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
	public stop(): void {
		if (this.intervalId !== null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}
}
export default IntervalRunner;
