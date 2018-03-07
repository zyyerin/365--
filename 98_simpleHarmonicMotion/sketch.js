// NOC 3.3 - simple harmonica motion

let amplitude = 5;
let a = 0; // framecount for one period
let r = 6; // radius of the ndoe
let total = 50;

function setup() {
  createCanvas(600, 600);

  total = Math.round(width/r)-1;
}

function draw() {
  background(255);
  translate(width/2, 0);

  a += 0.005;

  fill(0);
  for(let i=1; i<total; i++) {
    let interval = i * r;
    let x = amplitude * sin(a*i);

    ellipse(x, interval, r, r);
    line(0, interval, x, interval);
  }

  if (amplitude > 5){
    amplitude *= 0.99;
  }
}

function mouseMoved() {
  amplitude += 0.5;
}
