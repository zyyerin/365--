let mic;
let amp;
let volhistory = [];
let angle;

//p5 lerp
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  angleMode(DEGREES);
  mic = new p5.AudioIn();
  mic.start();
  amp = new p5.Amplitude();

  angle = 360;
}

function draw() {
  //    background(255);
  fill(255, 20);
  noStroke();
  rect(0, 0, width, height);
  let vol = mic.getLevel();
  volhistory.push(vol);

  if (volhistory.length > 360) {
    volhistory.splice(0, 1);
  }

  stroke(0);
  strokeWeight(vol*100);
  noFill();
  ellipse(random(width), random(height), vol * height*2, vol * height*2);
  fill(0);
  ellipse(random(width), random(height), vol * width*2, vol * width*2);
}
