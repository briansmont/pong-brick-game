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

function drawBall() {
 ctx.beginPath();
 ctx.arc(x, y, 10, 0, Math.PI*2);
 ctx.fillStyle = "blue";
 ctx.fill();
 ctx.closePath();
}

function draw() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 drawBall();
 x += dx;
 y += dy;
}

setInterval(draw, 10);