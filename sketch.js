var k = 20; //сторона* клетки 
var gen;
var p = 0; // счетчик остановок
var pastX, pastY;


function setup() {
	createCanvas(401, 401);
	width -= 1;
	height -= 1;
	rect(0, 0, width, height);
	gen = new Generation();
	gen.allIsDead();
	frameRate(12);
}

function draw() {
	gen.new();
	gen.draw();	

}

function keyPressed() {
	if (keyCode == 32 && p%2 == 0) {
		noLoop();
		p++;
	} else if (keyCode == 32 && p%2 != 0) {
		loop();
		p++;
	}
}

function mousePressed() {
	gen.getAndDraw('can kill');
	pastX = mouseX;
	pastY = mouseY;
}

function mouseDragged() {
	if (dist(pastX, pastY, mouseX, mouseY) > 5 ) {
		gen.getAndDraw();
	}
}