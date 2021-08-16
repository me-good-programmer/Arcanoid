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

const W_W = canvas.width;
const W_H = canvas.height;


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
		this.width = 90;
		this.height = 9;
		this.dx = 10;
	}

	move(event){
		if ((event.code == this.k_left)&&(this.x - this.dx > -1)){
			this.x -= this.dx
		} else if (event.code == this.k_right){
			this.x += this.dx	
		}
	}

	moveM(event){
		var newX = (event.clientX - canvas.offsetLeft);
		if ((newX - this.width/2 > -1)&&(newX + this.width/2 < 515)){
			this.x = newX - Math.floor(this.width/2);
		}
		
		
	}

	draw(){
		ctx.drawImage(this.img, this.x, this.y);
	}
}

class Ball {
	constructor(img, x, y) {
		this.img = img
		
		this.x = x
		this.y = y
		this.width = 12;
		this.height = 12;
		this.dx = 5
		this.dy = -5

	}
	move(){
		this.x += this.dx
		this.y += this.dy
	}

	draw() {
		ctx.drawImage(this.img, this.x, this.y);		
	}

	collideWall() {
		if (this.x + this.dx < -1){
			this.dx = -this.dx
		}
		if (this.x + this.width + this.dx > W_W){
			this.dx = -this.dx
		}
		if (this.y + this.dy < -1){
			this.dy = -this.dy
		}
		if (this.y + this.height + this.dy > W_H){
			this.dy = -this.dy
		}
	}

	collidePaddle() {
		if ((this.x + this.dx + this.width > pad.x) && (this.x + this.dx < pad.x + pad.width) && (this.y + this.dy + this.height > pad.y)){
			this.dy = -this.dy
		}	
	}//bricks[i].x = 1000

	collideBricks() {
		for (var i = 0; i < bricks.length; i++) {
			if ((this.x + this.dx + this.width > bricks[i].x) && (this.x + this.dx < bricks[i].x + 42) && (this.y + this.dy + this.height > bricks[i].y)&&(this.y + this.dy < bricks[i].y + 20 )){
				if ((this.x > bricks[i].x)&&(this.x + this.width < bricks[i].x + 42)&&(this.y > bricks[i].y + 20)){
					this.dy = - this.dy	
					bricks[i].x = 1000
				}else if ((this.x > bricks[i])&&(this.x + this.width < bricks[i].x + 42)&&(this.y < bricks[i].y)){
					this.dy = - this.dy	
					bricks[i].x = 1000
				}else if ((this.y > bricks[i].y)&&(this.y + this.height < bricks[i].y + 20)&&(this.x + this.width < bricks[i].x)){
					this.dx = - this.dx	
					bricks[i].x = 1000
				}else if ((this.y > bricks[i].y)&&(this.y + this.height < bricks[i].y + 20)&&(this.x > bricks[i].x + 42)){
					this.dx = - this.dx	
					bricks[i].x = 1000
				}
					
			}
			
		}	
			
	}
}

function init() {
	for (var i = 1; i < 11; i++) {
		for (j = 1; j < 11; j++) {
			bricks.push({x: i*43, y: j*21})
		}
	}
	pad = new Paddle(paddleImage, 0, 440, 'ArrowLeft', 'ArrowRight');
	bl = new Ball(ballImage, 300, 250);
}

function collideAll() {
	bl.collideWall();
	bl.collidePaddle();
	bl.collideBricks();
}

function moveAll(){
	bl.move();
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
	collideAll();
	moveAll();
	drawAll();


 	ctx.fillStyle = "green";
    ctx.font = "50px Arial";
    ctx.fillText("Text", 50, 100)


}

document.addEventListener("keydown", dir)
document.addEventListener("mousemove", mm)

function dir(event) {
	pad.move(event);
}

function mm(event) {
	pad.moveM(event);
}

function main() {
	init();

	game = setInterval(gameLoop, 20);
}

main()	



/*Задачи
Arcanoid
1) сделать так чтобы мячик двигался (аналогично тому как двигается змейка)
2) сделать так чтобы мячик отбивался от всех четырех стенок (можно догадаться, но такая же логика присутствовала в одном из прошлых проектов, где один квадратик двигался вверху экрана слева направо, а другой уходя за пределы экрана справа, снова появлялся слева)
3) сделать так чтобы мячик мог отбиваться от paddle. Для этого определить столкновение (можно догадаться или сделать как обрабатывалось попадание bullet в проекте где агент мог стрелять) и отбить, как от стенки.
4) сделать область где показывать сколько набрано очков (сбитых блоков). 
Напоминаю как выводить на экран:
        ctx.fillStyle = "green";
        ctx.font = "50px Arial";
        ctx.fillText("Text", x, y);  или ctx.fillText(score, x, y);

Сделать новый проект:
1) окно 800х600 или 16х12 клеток 50х50 (как в змейке).
2) агент перемещается по клеткам при нажатии на кнопки со стрелками.
3) не может выйти за пределы поля.
4) выводится (где угодно) число равное количеству сделанных шагов.*/

//1) 