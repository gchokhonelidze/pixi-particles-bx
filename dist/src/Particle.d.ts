import ParticleConfig from "./ParticleConfig";
import Vector2 from "./Vector2";
import { Container, MeshRope, Point, Sprite } from "pixi.js";
export interface TParticleCreationOptions {
    position: Vector2;
    container: Container;
}
interface TParticle {
    cfg: ParticleConfig;
    particleCreationOptions?: TParticleCreationOptions;
}
declare class Particle {
    #private;
    id: string;
    cfg: ParticleConfig;
    velocity: Vector2;
    sprite: Sprite;
    createdAt: number;
    lifetime: number;
    createAfter: number;
    expired: boolean;
    expiredAt: number;
    size: Vector2;
    globalPosition: Vector2;
    _particleCreationOptions?: TParticleCreationOptions;
    _emittedChild: boolean;
    _meshrope?: MeshRope;
    _meshropePoints: Point[];
    static on: Map<string, Set<Particle>>;
    static off: Map<string, Set<Particle>>;
    constructor(props: TParticle);
    retire: () => void;
    revive: () => void;
    static take: (props: TParticle) => Particle;
}
export default Particle;
