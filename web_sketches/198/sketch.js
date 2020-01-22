let mic;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn()
  mic.start();
  fill(0,5);
  noStroke();
}

function draw() {
  // background(255);
  micLevel = mic.getLevel()*0.5;
  let r = micLevel*(width*4);
  ellipse(width / 2, constrain(height - micLevel * height * 5, 0, height-r), r, r);
  ellipse(width / 2, height - constrain(height - micLevel * height * 5, 0, height-r), r, r);
}
