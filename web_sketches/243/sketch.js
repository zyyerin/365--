var posx = 0;
var posy = 0;
var es = 500;

function setup() {
	createCanvas(600, 600);
	background(0);
}

function draw() {
	fill(255, 10);
	strokeWeight(2);
	ellipse(posx, posy, es, es);
	if (posx < 600 - es/2) {
		posx++;
		posy++;
	}
}