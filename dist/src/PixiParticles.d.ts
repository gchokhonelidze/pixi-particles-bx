import * as PIXI from "pixi.js";
import ParticleConfig from "./ParticleConfig";
declare class PixiParticles {
    #private;
    static inst: PixiParticles;
    constructor(app: PIXI.Application<PIXI.Renderer>);
    create: (config: ParticleConfig) => void;
    destroy: (configId: string) => void;
}
export default PixiParticles;
