let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// bolinha
let x;
let y;
let dx;
let dy;
let ballRadius = 10; // raio da bola

// barra
let paddleHeight = 10;
let paddleWidth = 75;
let paddleHeight2 = 10;
let paddleWidth2 = 75;
let paddleX;
let paddleX2;
let paddleY = (canvas.height - paddleHeight) - 10;
let paddleY2 = 30;
let upPressed = false;
let downPressed = false;
let rightPressed = false;
let leftPressed = false;

// pontuação e vidas
let score = 0;
let score2 = 0;
let limit = 5;

function addLimit(){
  limit++;
}

function removeLimit(){
  limit--;
}

function setupBallAndPaddle() {
  x = canvas.width / 2; // inicial horizontal
  y = canvas.height / 2; // inicial vertical
  dx = 3; // variação horizontal
  dy = -3; // variação vertical;
  paddleX = (canvas.width - paddleWidth) / 2;
  paddleX2 = (canvas.width - paddleWidth) / 2;
}

setupBallAndPaddle();

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Pontuação P1: " + score, 8, 20);
}

function drawScore2() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Pontuação P2: " + score2, 350, 20);
}

function drawLimit() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Limite: " + limit, 210, 20);
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.rect(paddleX2, paddleY2, paddleWidth2, paddleHeight2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawScore2();
  drawLimit();
  // verifica se a bola sai na horizontal
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx; // inverte o sinal de dx
  }
  // verifica se a bola sai na vertical
  if (x > paddleX && x < paddleX + paddleWidth && y + ballRadius >= paddleY ||
     x > paddleX2 && x < paddleX2 + paddleWidth && y - ballRadius <= paddleY2 + paddleHeight) {
    dy = -dy;
  } else if(score == limit){
    alert('Jogador 1 venceu!');
    setupBallAndPaddle();
    score = 0;
  } else if(score2 == limit) {
    alert('Jogador 2 venceu!');
    setupBallAndPaddle();
    score2 = 0;
  } else if (y + dy > canvas.height - ballRadius) {
    score++;
    setupBallAndPaddle();
  } else if (y + dy < ballRadius){
    score2++;
    setupBallAndPaddle();
  }

  if (rightPressed) {
    paddleX2 += 7;
    if (paddleX2 + paddleWidth > canvas.width) {
      paddleX2 = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX2 -= 7;
    if (paddleX2 < 0) {
      paddleX2 = 0;
    }
  } else if (upPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (downPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}

draw();

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
  if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = true;
  }
  if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
  if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = false;
  }
  if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = false;
  }
}

// adiciona eventos de controle para o teclado
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

