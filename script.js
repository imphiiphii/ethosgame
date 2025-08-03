const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let keys = {};
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// Load image
const characterImg = new Image();
characterImg.src = 'assets/character.jpg'; // pastikan gambar ada di folder "assets"

const car = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 120,
  width: 50,
  height: 100,
  speed: 5,
};

function drawRoad() {
  ctx.fillStyle = "#666";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#fff";
  ctx.setLineDash([20, 20]);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
}

function drawCar() {
  ctx.fillStyle = "#2ecc71";
  ctx.fillRect(car.x, car.y, car.width, car.height);

  // Draw character image on top of car
  ctx.drawImage(characterImg, car.x, car.y - 30, car.width, 30);
}

function update() {
  if (keys["ArrowLeft"] && car.x > 0) {
    car.x -= car.speed;
  }
  if (keys["ArrowRight"] && car.x + car.width < canvas.width) {
    car.x += car.speed;
  }
}

function gameLoop() {
  drawRoad();
  update();
  drawCar();
  requestAnimationFrame(gameLoop);
}

characterImg.onload = () => {
  gameLoop();
};
