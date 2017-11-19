var w = 600;
var h = 600;

var posx = 0;
var posy = 0;
var es = 1000;
var t = 0.1;
var t2 = 0.2;

function setup() {
	createCanvas(w, h);
	background(0);
	rectMode(CENTER);
}

function draw() {
	posx = noise(t) * w;
	posy = noise(t2) * h;

	// noFill();
	fill(255, 2);
	// stroke(255,10);
	// strokeWeight(2);
	rect(posx, posy, es*noise(t), es*noise(t2));
	rect(posy, posx, es*noise(t), es*noise(t2));
	rect(w-posx, posy, es*noise(t2), es*noise(t));
	rect(h-posy, posx, es*noise(t2), es*noise(t));


	rect(posx, h-posy, es*noise(t2), es*noise(t));
	rect(posy, w-posx, es*noise(t2), es*noise(t));
	rect(w-posx, h-posy, es*noise(t), es*noise(t2));
	rect(h-posy, w-posx, es*noise(t), es*noise(t2));
	t += 0.001;
	t2 += 0.001;
}