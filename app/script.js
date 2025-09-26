import { Bird } from "./scripts/Bird.js";

const canvas = document.getElementById("flappy");
const canvasContainer = document.querySelector(".canvas-container");
const inputSizeBrush = document.getElementById("brush-size");
const inputsModeBrush = document.querySelectorAll("input[name='mode']");
const inputQtdBirds = document.getElementById("qtdBirds");
const outputQtdBirds = document.getElementById("outputQtdBirds");
const buttonPlay = document.getElementById("play");
const ctx = canvas.getContext("2d");

let width = (canvas.width = canvasContainer.offsetWidth - 2);
let height = (canvas.height = canvasContainer.offsetHeight - 50);

const birds = [];

let qtdBirds,
  birdsInSimulation = [];

let isDrawing = false;
let isErasing = false;
let isSimulate = false;
let startX, startY, lastX, lastY;
let obstacles = [];
let brushSize = 10;
let brushMode = "pencil";
let animationId = null;

let deaths = { top: 0, bottom: 0, obstacle: 0, end: 0 };

window.addEventListener("resize", () => {
  width = canvas.width = canvasContainer.offsetWidth - 2;
});

document.addEventListener("keydown", (e) => {
  if (e.code === "KeyJ") {
    birds[0].jump(); // só o primeiro bird pra testar
  }
});

inputsModeBrush.forEach((input) => {
  input.addEventListener("change", () => {
    brushMode = input.value;
  });
});

inputQtdBirds.addEventListener("input", () => {
  qtdBirds = parseInt(inputQtdBirds.value) || 0;
  birds.length = 0;
  createBirds();
  outputQtdBirds.textContent = birds.length || 0;
  preview();
});

buttonPlay.addEventListener("click", () => {
  isSimulate = !isSimulate;

  console.log(isSimulate);

  if (isSimulate) {
    if (!birds || birds.length === 0) {
      createBirds();
      renderAll();
    }

    if (!birdsInSimulation || birdsInSimulation.length === 0) {
      birdsInSimulation = [...birds];
    }

    startLoop();
  } else {
    stopLoop();
  }
});

canvas.addEventListener("mousedown", (e) => {
  if (brushMode === "pencil") {
    startX = e.offsetX;
    startY = e.offsetY;
    isDrawing = true;
  } else if (brushMode === "eraser") {
    isErasing = true;
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.setLineDash([6, 4]);
    const w = e.offsetX - startX;
    const h = e.offsetY - startY;
    renderAll();
    ctx.fillStyle = "black";
    ctx.strokeRect(startX, startY, w, h);
  }
});

canvas.addEventListener("mouseup", (e) => {
  ctx.setLineDash([]);
  lastX = e.offsetX;
  lastY = e.offsetY;
  if (isDrawing) {
    obstacles.push({
      x: Math.min(startX, lastX),
      y: Math.min(startY, lastY),
      width: Math.abs(lastX - startX),
      height: Math.abs(lastY - startY),
    });
    isDrawing = false;
    console.log(obstacles);
  } else if (isErasing) {
    obstacles.forEach((obs, i) => {
      if (
        lastX >= obs.x &&
        lastX <= obs.x + obs.width &&
        lastY >= obs.y &&
        lastY <= obs.y + obs.height
      ) {
        obstacles.splice(i, 1);
      }
    });
  }
  renderAll();
});
// canvas.addEventListener("mouseout", () => {
//     isDrawing = false
//     isErasing = false
// })

function renderAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  obstacles.forEach((obs) => {
    ctx.fillStyle = "black";
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  });
  birdsInSimulation.forEach((bird) => bird.draw(ctx, canvas.height));
}

function preview() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  birds.forEach((bird) => bird.draw(ctx));

  obstacles.forEach((obs) => {
    ctx.fillStyle = "black";
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  });
}

function createBirds() {
  birds.length = 0;
  for (let i = 0; i < qtdBirds; i++) {
    birds.push(
      new Bird(
        randBetween(0.5, 1.5),
        randBetween(6, 9),
        randBetween(40, 60),
        randBetween(50, canvas.height / 2),
        Math.floor(randBetween(5, 30)),
        {
          WDistTopo: randBetween(-1, 1),
          WDistChao: randBetween(-1, 1),
          WVelY: randBetween(-1, 1),
          WObsX: randBetween(-1, 1),
          WObsTopo: randBetween(-1, 1),
          WObsBottom: randBetween(-1, 1),
          bias: randBetween(-1, 1),
        }
      )
    );
  }
}

function randBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
}

// function gameLoop() {
//   if (isSimulate) {
//     birdsInSimulation.forEach((bird) => bird.update());

//     birdsInSimulation.forEach((bird, i) => {
//       if (bird.isAlive === false) {
//         birdsInSimulation.splice(i, 1)
//       }
//     })

//     renderAll();

//     requestAnimationFrame(gameLoop);
//   }
// }

function startLoop() {
  if (animationId) return;
  animationId = requestAnimationFrame(loop);
}

function stopLoop() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

function loop() {
  if (!isSimulate) {
    animationId = null;
    return;
  }

  try {
    for (let i = birdsInSimulation.length; i >= 0; i--) {
      const bird = birdsInSimulation[i];
      if (!bird) continue;

      bird.update(obstacles, canvas);

      if (!bird.isAlive) {
        birdsInSimulation.splice(i, 1);
        deaths[bird.deathReason]++;
      }
    }

    renderAll();

    outputQtdBirds.textContent = birdsInSimulation.length;

    if (birdsInSimulation.length === 0) {
      stopLoop();
      isSimulate = false;
      console.log("todos os passaros morreram - simulação acabou");
      console.log("Relatório da geração:", deaths);

      deaths = { top: 0, bottom: 0, obstacle: 0, end: 0 };

      birds.length = 0;
      createBirds();
      birdsInSimulation = [...birds];
      return;
    }

    animationId = requestAnimationFrame(loop);
  } catch (error) {
    console.log("erro no loop:", error);
    stopLoop();
  }
}
