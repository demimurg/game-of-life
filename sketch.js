const k = 20 // ceil size
let p = 0 // space bar counter
let gen, last_x, last_y


function setup() {
	createCanvas(802, 802)
	width -= 2
	height -= 2
	gen = new Generation()
	gen.startCondition()
	frameRate(10)
}

function draw() {
	clear()
	gen.new()
	gen.draw()	
}

function keyPressed() {
	if (keyCode == 32) {
		switch (p % 2) {
			case 0:
				noLoop()
				break
			case 1:
				loop()
				break
		}
		p++ 
	} else if (keyCode == 75) {
		gen.startCondition()
	}
}

function mousePressed() {
	gen.getAndDraw('can kill')
	last_x = mouseX
	last_y = mouseY
}

function mouseDragged() {
	if (dist(last_x, last_y, mouseX, mouseY) > 5 ) {
		gen.getAndDraw()
	}
}