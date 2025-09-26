export class Bird {
  constructor(peso, impulso, velocidadeVoo, distanciaVisao, lerdeza, brain) {
    this.x = 50;
    this.y = 200;
    this.velY = 0;
    this.peso = peso;
    this.impulso = impulso;
    this.velocidadeVoo = velocidadeVoo;
    this.gravity = 4;
    this.brain = brain;
    this.distanciaVisao = distanciaVisao;
    this.lerdeza = lerdeza;
    this.frameCounter = 0;
    this.isAlive = true;
    this.deathReason = null;
    this.score = 0;
    this.fitness = 0;
    this.age = 0;
  }

  update(obstacles, canvas) {

    this.frameCounter++

    const gravityForce = (this.gravity * this.peso) / this.lerdeza;
    const radius = canvas.height * 0.03;
    this.velY += gravityForce;
    this.y += this.velY;
    this.x += this.velocidadeVoo / 60;

    for (const obs of obstacles) {
      const closestX = Math.max(obs.x, Math.min(this.x, obs.x + obs.width));
      const closestY = Math.max(obs.y, Math.min(this.y, obs.y + obs.height));

      const dx = this.x - closestX;
      const dy = this.y - closestY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < radius) {
        this.isAlive = false;
        this.deathReason = "obstacle";
      }
    }

    // if (this.y - radius <= 0 || this.y + radius >= canvas.height) {
    //   this.isAlive = false;
    // }

    if (this.y - radius <= 0) {
      this.isAlive = false;
      this.deathReason = "top";
    } else if (this.y + radius >= canvas.height) {
      this.isAlive = false;
      this.deathReason = "bottom";
    }

    if (this.x > canvas.width) {
      this.isAlive = false;
      this.deathReason = "end";
    }

    if (this.isAlive) {
      const nextObs = obstacles.reduce((closest, obs) => {
        if (obs.x + obs.width < this.x) return closest;

        if (!closest) return obs;

        const distCurrent = obs.x - this.x;
        const distClosest = closest.x - this.x;

        return distCurrent < distClosest ? obs : closest;
      }, null);

      const normDt = (this.y / canvas.height) * 2 - 1;
      const normDb = ((canvas.height - this.y) / canvas.height) * 2 - 1;

      const normVy = Math.tanh(this.velY / 10);

      if (nextObs) {
        const distObsX = nextObs.x - this.x;
        const distObsTopo = this.y - nextObs.y;
        const distObsBottom = nextObs.y + nextObs.height - this.y;

        const normObsX = (2 * distObsX) / canvas.width - 1;
        const normObsTopo = (2 * distObsTopo) / canvas.height - 1;
        const normObsBottom = (2 * distObsBottom) / canvas.height - 1;

        this.think(
          normDt,
          normDb,
          normVy,
          normObsX,
          normObsTopo,
          normObsBottom
        );
      } else {
        this.think(normDt, normDb, normVy, 0, 0, 0);
        // console.log("sem obs");
      }
    }
  }

  jump() {
    this.velY = -this.impulso;
  }

  think(distTopo, distChao, velY, distObsX, distObsTopo, distObsBottom) {

    if (this.frameCounter % this.lerdeza !== 0) return;

    console.log("pensou")

    const sum =
      distTopo * this.brain.WDistTopo +
      distChao * this.brain.WDistChao +
      velY * this.brain.WVelY +
      distObsX * this.brain.WObsX +
      distObsTopo * this.brain.WObsTopo +
      distObsBottom * this.brain.WObsBottom +
      this.brain.bias;

    let output = Math.tanh(sum);

    if (output > 0.5) {
      this.jump();
    }
  }

  draw(ctx, canvas) {
    const radius = canvas * 0.03; // mesmo cálculo do update
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
