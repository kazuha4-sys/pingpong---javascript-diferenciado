// Copyright (c) 2024 Kaun e Enzo
// GitHub: https://github.com/kazuha4-sys/
let ball;
let player;
let score = 0;
const paddleWidth = 75;
const paddleHeight = 10;

function setup() {
  const canvas = createCanvas(800, 400);
  canvas.parent('main');

  ball = {
    x: width / 2,
    y: height / 2,
    radius: 10,
    speed: 2,
    dx: 2,
    dy: 2
  };

  player = {
    x: width / 2 - paddleWidth / 2,
    y: height - paddleHeight - 10,
    width: paddleWidth,
    height: paddleHeight,
    dy: 5
  };
}

function draw() {
  background(0);

  drawBall();
  drawPaddle();

  movePaddle();
  moveBall();

  checkCollisions();
  checkScore();
}

function drawBall() {
  fill(255);
  ellipse(ball.x, ball.y, ball.radius * 2);
}

function drawPaddle() {
  fill(255);
  rect(player.x, player.y, player.width, player.height);
}

function movePaddle() {
  if (keyIsDown(65) && player.x > 0) { // "A" key
    player.x -= player.dy;
  } else if (keyIsDown(68) && player.x + player.width < width) { // "D" key
    player.x += player.dy;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function checkCollisions() {
  // Colisão com as laterais da tela
  if (ball.x + ball.radius > width || ball.x - ball.radius < 0) {
    ball.dx *= -1;
  }

  // Colisão com a raquete
  if (ball.x + ball.radius > player.x && ball.x - ball.radius < player.x + player.width && ball.y + ball.radius > player.y) {
    ball.dy *= -1;
    score++;
    updateScore();
  }

  // Colisão com a parte superior da tela
  if (ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }
}

function checkScore() {
  // Verifica se a bola ultrapassou a raquete
  if (ball.y + ball.radius > height) {
    score = 0; // Resetar a pontuação
    updateScore();
  }
}

function updateScore() {
  document.getElementById('score').innerText = "Pontuação: " + score;
}
