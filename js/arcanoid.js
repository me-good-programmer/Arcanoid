const canvas = document.getElementById('field');
const ctx = canvas.getContext("2d");

const bgImage = new Image();
bgImage.src ="img/bg.png";

const brickImage = new Image();
brickImage.src ="img/brick.png";

const paddleImage = new Image();
paddleImage.src ="img/paddle.png";

const ballImage = new Image();
ballImage.src ="img/ball.png";



const C_S = 32;
M = 15
N = 17
FIELD_W = M * C_S
FIELD_H = N * C_S 

var game;
var pad;
var bl;
var bricks = [];

function randInt(min, max) {
	return Math.floor(Math.random()*max + min);
}

class Paddle {
	constructor(img, x, y, k_left, k_right) {
		this.img = img;
		
		this.k_left = k_left;
		this.k_right = k_right;

		this.x = x
		this.y = y
		this.speed = 10;
	}
	move(){
		if ((event.code == this.k_left) && (this.x - this.speed > 0)){
			this.x -= this.speed
		} else if ((event.code == this.k_right) && (this.x + this.speed < 620)) {
		 	this.x += this.speed;
		}		
	}

	draw(){
		ctx.drawImage(this.img, this.x, this.y);
	}

	isTouchWall() {
		if (this.x == 0)
			clearInterval(game);

		else if (this.body[0].x == 576)
			clearInterval(game);
	}
}

class Ball {
	constructor(img, x, y) {
		this.img = img

		this.x = x
		this.y = y

		this.direction = { x: 1, y: 0};

		

	}
	move(){
	
	}

	draw() {
		ctx.drawImage(this.img, this.x, this.y);
			
	}
	

	collide() {

	}
}


function init() {
	for (var i = 1; i < 11; i++) {
		for (j = 1; j < 11; j++) {
			bricks.push({x: i*43, y: j*21})
		}
	}
	pad = new Paddle(paddleImage, 0, 430, 'ArrowLeft', 'ArrowRight');
	bl = new Ball(ballImage, 300, 250);
}


function moveAll(){

}

function drawAll(){
	ctx.drawImage(bgImage, 0, 0);
	pad.draw();
	bl.draw();
	for (var i = 0; i < bricks.length; i++) {
		ctx.drawImage(brickImage, bricks[i].x, bricks[i].y)
	}
}

function gameLoop(argument) {
	moveAll();
	drawAll();
}

document.addEventListener("keydown", dir)

function dir(event) {
	pad.move(event);
}

function main() {
	init();

	game = setInterval(gameLoop, 100);
}

main()	