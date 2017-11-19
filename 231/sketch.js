// create a counter variable to count time
var counter;

function setup() {
	createCanvas(600, 600);
	background(0);
	//initialize the counter
	counter = 0;
}

function draw() {
	fill(255);
	noStroke();

	// add 1 to the counter variable per frame
	counter ++;
	// draw a circle every 60 frames
	if(counter == 6) {
		ellipse(mouseX, mouseY, 50, 50);
		// reset the counter to 0
		counter = 0;
	}
	
}