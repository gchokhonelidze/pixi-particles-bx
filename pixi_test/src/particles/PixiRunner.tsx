import * as PIXI from "pixi.js";
import "pixi.js/advanced-blend-modes";
import { Application, Assets } from "pixi.js";
// import gsap from "gsap";
//
import { Vector2, ParticleConfig, PixiParticles } from "pixi-particles-bx";

interface PIXI_MODULE {
	globalThis: { __PIXI_APP__: Application };
}
function ISPixiModule(o: Window | null | PIXI_MODULE): o is PIXI_MODULE {
	return o != null && "globalThis" in o;
}
class PixiRunner {
	static inst: PixiRunner = null!;
	app: Application = null!;
	#root: HTMLElement = null!;
	pixiParticles: PixiParticles = null!;
	constructor() {
		if (PixiRunner.inst != null) return PixiRunner.inst;
		PixiRunner.inst = this;
		this.init();
	}
	init = async () => {
		this.#root = document.querySelector("#root")!;
		const appConfig = {
			antialias: true,
			autoDensity: true,
			background: "#333",
			preference: "webgpu",
			roundPixels: true,
			useBackBuffer: true,
			resolution: Math.ceil(window.devicePixelRatio ?? 1),
			resizeTo: this.#root,
			hello: true,
		} as Partial<PIXI.ApplicationOptions>;
		this.app = new Application();
		if (ISPixiModule(window)) {
			window.globalThis.__PIXI_APP__ = this.app;
		}
		await this.app.init(appConfig);
		this.app.stage.label = "stage";
		this.#root.appendChild(this.app.canvas as HTMLCanvasElement);
		const root = new PIXI.Container();
		this.app.stage.addChild(root);
		await this.loadAssets();
		//init particles class:
		this.pixiParticles = new PixiParticles(this.app);

		this.test();
	};
	loadAssets = async () => {
		Assets.addBundle("bundle1", [
			{ alias: "particle", src: "./particle.png" },
			{ alias: "arrow", src: "./arrow.png" },
		]);
		await Assets.loadBundle("bundle1", () => {});
	};
	test = () => {
		const c = new PIXI.Container();
		c.rotation = 45;
		c.label = "particles";
		this.app.stage.addChild(c);
		c.x = 400;
		c.y = 400;
		

		//g:
		const g = new PIXI.Graphics();
		g.rect(0, 0, 20, 10);
		g.fill({ color: "red" });
		g.pivot.set(10, 5);
		c.addChild(g);

		const cfg = new ParticleConfig({
			container: c,
			shape:  { x: -200, y: -200, width: 400, height: 10, onlyEdges: false }, //{ cx: 0, cy: 0, radius: 30, onlyCircumference: true },
			duration: 50,
			texture: Assets.get("particle"),
			count: 10,
			blendMode: "add",
			lifetime: 500, // { from: 50, to: 700 },
			speed: 0,
			rotateTowardsVelocity: true,
			spriteAngle: 90,

			direction: [{ from: 70, to: 90 }],
			// size: ,
			// angleOverLifetime: [0, 360],
			// alphaOverLifetime: [0, 1, 0],
			// colorOverLifetime: ["white", "cyan"],
			// colorOverLifetime: ["yellow", "gold", "red", "rgb(255, 38, 0)", "orange", "violet", "blue", "cyan"],
			size: new Vector2(0.1, 0.1),
			simulation: "world",
			scaleOverLifetime: [new Vector2(0.1, 0.1), new Vector2(2, 2)],
			// direction: { from: 0, to: 359 },
			// forceOverLifetime: [new Vector2(0, 0.1)],
		});
		this.pixiParticles.create(cfg);

		// const cfg2 = new ParticleConfig({
		// 	container: c,
		// 	count: 1,
		// 	duration: 1000,
		// 	lifetime: 1000,
		// 	texture: Assets.get("arrow"),
		// 	colorOverLifetime: ["red", "green"],
		// 	simulation: "world",
		// });
		// this.pixiParticles.create(cfg2);

		// const t = gsap.timeline();
		// t.to(c, { x: 800, duration: 3 });
		// t.to(c, { x: 200, duration: 3 });
		// t.to(c, { x: 800, duration: 3 });
		// t.to(c, { x: 200, duration: 3 });
		// t.to(c, { x: 800, duration: 3 });
		// t.to(c, {
		// 	x: 200,
		// 	duration: 3,
		// 	onComplete: () => {
		// 		this.pixiParticles.destroy(cfg.id);
		// 	},
		// });
	};
}
export default PixiRunner;
