import * as PIXI from "pixi.js";
import ParticleConfig from "./ParticleConfig";
declare class PixiParticles {
    #private;
    static inst: PixiParticles;
    constructor(app: PIXI.Application<PIXI.Renderer>);
    create: (config: ParticleConfig) => void;
    once: (configId: string) => void;
    pause: (configId: string) => ParticleConfig;
    resume: (configId: string) => ParticleConfig;
    toggle: (configId: string) => ParticleConfig;
    isRunning: (configId: string) => boolean;
    destroy: (configId: string) => void;
    lastTime: number;
}
export default PixiParticles;
