let mic;
let amp;
let volhistory = [];
let angle;

//p5 lerp
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(125);
  angleMode(DEGREES);
  mic = new p5.AudioIn();
  mic.start();
  amp = new p5.Amplitude();

  angle = 0;
}

function draw() {
  background(255);

  let vol = mic.getLevel();
  print(vol);
  let detail = floor(map(vol, 0, 1, height/5, width));

  volhistory.push(vol);

  if (volhistory.length > 360) {
    volhistory.splice(0, 1);
  }


  push();
  rotateY(angle);
  rotateZ(-angle);


  translate(-height/10, 0);
  fill(0);
  box(height/10, height/5, detail);

  translate(height/10, 0);
  fill(200);
  box(height/10, height/5, detail);
  pop();
  angle += 0.005;














}
