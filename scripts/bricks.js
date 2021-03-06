var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 4;
var dy = -4;
var ballRadius = 10;
var paddleHeight = 15;
var paddleWidth = 125;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 8;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 10;
var permBrickY = 340;

var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
 bricks[c] = [];
 for (r = 0; r < brickRowCount; r++) {
	bricks[c][r] = { x: 0, y: 0, status: 1 };
 }
}

function drawBall() {
 ctx.beginPath();
 ctx.arc(x, y, ballRadius, 0, Math.PI*2);
 ctx.fillStyle = "white";
 ctx.fill();
 ctx.closePath();
}

function drawPaddle() {
 ctx.beginPath();
 ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
 ctx.fillStyle = "blue";
 ctx.fill();
 ctx.closePath();
}

function drawBricks() {
 for(c=0; c<brickColumnCount; c++) {
	for(r=0; r<brickRowCount; r++) {
		if(bricks[c][r].status == 1) {
			var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
			var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
			bricks[c][r].x = brickX;
			bricks[c][r].y = brickY;
			ctx.beginPath();
			ctx.rect(brickX, brickY, brickWidth, brickHeight);
			ctx.fillStyle = "red";
			ctx.fill();
			ctx.closePath();
		}
	}
 }
}

function drawPermBricks(amount) {
	var xSpace = (canvas.width / amount) - brickWidth * 1.25;
	var brickY = permBrickY;
	var brickX = xSpace
	for (var b = 0; b < amount; b++) {
		ctx.beginPath();
		ctx.rect(brickX, brickY, brickWidth, brickHeight);
		ctx.fillStyle = "grey";
		ctx.fill();
		ctx.closePath();
		if (y + dy > brickY && y < brickY + brickHeight) {
			if ( x > brickX && x < brickX + brickWidth) {
				console.log('permanent brick');
				dy = -dy;
			}
		}
		if (x === brickX || x === brickX + brickWidth) {
			if (y > brickY && x < brickY + brickHeight) {
				dx = -dx;
			}
		}
		brickX += (xSpace + brickOffsetLeft) ;
	}
}

function collisionDetection() {
	for (c = 0; c < brickColumnCount; c++) {
		for (r = 0; r< brickRowCount; r++) {
			var b = bricks[c][r];
			if(b.status ==1) {
				if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
					dy = -dy;
					b.status = 0;
					score += 5;
					if (score == brickRowCount * brickColumnCount * 5) {
						alert("You have defeated the brickvaders!");
						document.location.reload();
					}
				}
			}
		}
	}
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Lives: " + lives, canvas.width - 65, 20)
}

function draw() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 drawBricks();
 drawPermBricks(3);
 drawBall();
 drawPaddle();
 drawScore();
 drawLives();
 collisionDetection();
	
// redirect ball
	// right & left wall
 if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
	dx = -dx;
 }
  //top
 if (y + dy < ballRadius) {
	dy = -dy;
//	 console.log('top');
 } else if (y + dy > canvas.height - ballRadius) {
	if (x > paddleX && x < paddleX + paddleWidth/2) {
//		console.log('paddle left');
	  dy = -dy;
		dx = -4;
	} else if (x > paddleX + paddleWidth/2 && x < paddleX + paddleWidth) {
//		console.log('paddle right');
	  dy = -dy;
		dx = 4;
	}
	else {
//		console.log('one less life');
		lives --;
	 	if(!lives) {
//			console.log('game over');
			alert("Game Over!!!");
			document.location.reload();
		} else {
//			console.log('next life');
			x = canvas.width / 2;
			y = canvas.height - 30;
			dx = 4;
			dy = -4;
			paddleX = (canvas.width - paddleWidth) / 2;
		}
		
	}
 }	
 
//move paddles
 if (rightPressed && paddleX < canvas.width - paddleWidth) {
	paddleX += 12;
 } else if (leftPressed && paddleX > 0) {
	paddleX -= 12;
 }
 
 x += dx;
 y += dy;
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX - (paddleWidth / 2);
	}
}

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





















