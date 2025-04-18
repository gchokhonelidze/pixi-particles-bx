
# Pixi-Particles-Bx

This package aims to simplify particle generation and usage in your pixi projects. Currently this package is created for Pixi v.8 and above.




## Features

- Multiple particles per scene
- Particles duration, particle lifetime
- Alpha over lifetime
- Size (from, to)
- Scale over lifetime
- Direction (individual angles, or ranges to randomly choose from)
- Speed
- Acceleration over lifetime
- Force over lifetime
- Make rotation towards velocity
- Sprite angle (other rotation calculations will be added to the current angle)
- Angle over lifetime
- Color over lifetime
- Simulation (world or local)
- Starting shape (point default, rectangle, circle, convex polygons)
- Subemitter support (parallel children, children can have own children, run child every fixed interval untill parent alive)
- Other features will come soon

## Deployment

To deploy this project run

```bash
  npm install pixi-particles-bx
```


## Usage/Examples

```javascript
import { Vector2, ParticleConfig, PixiParticles } from "pixi-particles-bx";
```
**1) Create PixiParticles instance:**
```javascript
const pixiParticles = new PixiParticles(this.app);
```
**2) Write your configuration:**
```javascript
const cfg = new ParticleConfig({
    container: c,
    shape:  { x: -200, y: -200, width: 400, height: 10, onlyEdges: false },
    duration: 50,
    texture: Assets.get("particle"),
    count: 10,
    blendMode: "add",
    lifetime: 500, // { from: 50, to: 700 },
    speed: 0,
    rotateTowardsVelocity: true,
    spriteAngle: 90,
    angleOverLifetime: [0, 360],
    alphaOverLifetime: [0, 1, 0],
    colorOverLifetime: ["white", "cyan", "rgb(255,0,0)"],
    size: new Vector2(0.1, 0.1),
    simulation: "world",
    scaleOverLifetime: [new Vector2(0.1, 0.1), new Vector2(2, 2)],
    direction: { from: 0, to: 359 },
    forceOverLifetime: [new Vector2(0, 0.1)],
});
```
**3) Create particles:**
```javascript
pixiParticles.create(cfg);
```

