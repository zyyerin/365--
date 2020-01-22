var socket;
var t = 0.1;
var t2 = 0.1;
function setup() {
	createCanvas(400, 600);
	

	socket = io.connect('http://localhost:3000');
	socket.on('mouse', newDrawing);
}

function newDrawing(data) {
	noStroke();
	fill(0);
	ellipse(width-data.x, data.y, 20*noise(t2), 20*noise(t2));
}

function mouseMoved() {
	console.log("sending " + mouseX + ', ' + mouseY);

	 var data = {
	 	x: mouseX,
	 	y: mouseY
	 }
	 socket.emit('mouse', data);


	rw = random(30);
	fill(125);
	ellipse(mouseX, mouseY, 5*noise(t), 5*noise(t));
}

function draw() {
		t += 0.001;
		t2 += 0.01;

}