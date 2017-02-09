var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// changed context to ctx above FOR REFERENCE FOR LATER
//context.beginPath();
//context.rect(20, 40, 50, 50);
//context.fillStyle = "#FF0000";
//context.fill();
//context.closePath();
//
//context.beginPath();
//context.arc(240, 160, 20, 0, Math.PI*2, false);
//context.fillStyle = "green";
//context.fill();
//context.closePath();
//
//context.beginPath();
//context.rect(160, 10, 100, 40);
//context.strokeStyle = "rgba(0, 0, 255, 0.5)";
//context.stroke();
//context.closePath();

var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

function drawBall() {
 ctx.beginPath();
 ctx.arc(x, y, ballRadius, 0, Math.PI*2);
 ctx.fillStyle = "blue";
 ctx.fill();
 ctx.closePath();
}

function drawPaddle() {
 ctx.beginPath();
 ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
 ctx.fillStyle = "black";
 ctx.fill();
 ctx.closePath();
}


function draw() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 drawBall();
 drawPaddle();
 
// redirect ball
 if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
	dx = -dx;
 }
 if (y + dy < ballRadius) {
	dy = -dy;
 } else if (y + dy > canvas.height - ballRadius) {
	if (x > paddleX && x < paddleX + paddleWidth) {
	 dy = -dy;
	} else {
	 	alert("Game Over!!!");
		document.location.reload();
	}
 }
 
//move paddles
 if (rightPressed && paddleX < canvas.width - paddleWidth) {
	paddleX += 7;
 } else if (leftPressed && paddleX > 0) {
	paddleX -= 7;
 }
 
 x += dx;
 y += dy;
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
 if (e.keyCode == 39) {
	rightPressed = true;
 } else if (e.keyCode == 37) {
	leftPressed = true;
 }
}

function keyUpHandler(e) {
 if (e.keyCode == 39) {
	rightPressed = false;
 } else if (e.keyCode == 37) {
	leftPressed = false;
 }
}

setInterval(draw, 10);





















