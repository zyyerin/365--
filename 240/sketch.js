var t = 0;
var t2 = 1;


function setup(){
	createCanvas(600, 600);
	angleMode(DEGREES);
}

function draw() {
	background(255);
	stroke(0);
	fill(0, 200);

	beginShape();

	let aStep = map(mouseX, 0, width, 1, 300);
	// let aStep = noise(t)*100;
	t += 0.0001;
	for (let a = 0; a < 360; a += aStep) {
		let x = 100*sin(a) + width/2;
		let y = 100*cos(a) + height/2;
		curveVertex(x, y);
	}
	
	endShape(CLOSE);


	noFill();
	beginShape();

	let aStep2 = map(mouseY, 0, width, 1, 300);
	// let aStep2 = noise(t2)*100;
	t2 += 0.0002;
	for (let a = 0; a < 360; a += aStep2) {
		let x = 100*sin(a) + width/2;
		let y = 100*cos(a) + height/2;
		curveVertex(x, y);
	}
	
	endShape(CLOSE);

}
