// create a counter variable to count time
var counter;
var t, t2, t3;

function setup() {
	createCanvas(600, 600);
	// background();
	t = 0;
	t2 = 0;
	t3 = 0;
}

function draw() {
	x1 = width*noise(t);
	y1 = width*noise(t2);
	x2 = width*noise(t3);
	y2 = width*noise(t);
	t += 0.008;
	t2 += 0.007;
	t3 += 0.006;
	fill(255, 50);
	strokeWeight(0.5);
	stroke(0);
	// noStroke();
	noFill();



	bezier(width/2, height/2, x1, y1, x2, y2, width/2, height/2);
	stroke(255);
	bezier(width/2, height/2, x1, x2, y1, y2, width/2, height/2);	
}