import ParticleConfig from "./ParticleConfig";
declare class PixiParticles {
    #private;
    static inst: PixiParticles;
    constructor();
    create: (config: ParticleConfig) => void;
    destroy: (configId: string) => void;
}
export default PixiParticles;
