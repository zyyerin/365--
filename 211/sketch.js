let mic;
let amp;
let volhistory = [];
let angle;

//p5 lerp
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(255);
  angleMode(DEGREES);
  mic = new p5.AudioIn();
  mic.start();
  amp = new p5.Amplitude();

  angle = 0;
}

function draw() {
  background(255);

  let vol = mic.getLevel();
  let pushX = map(vol, 0, 1, height/15, height);

  volhistory.push(vol);

  if (volhistory.length > 360) {
    volhistory.splice(0, 1);
  }


  push();
  rotateY(angle);
  rotateZ(-angle);


  translate(-pushX, 0);
  fill(0);
  box(height/15, height/5, height/5);

  translate(pushX*2, 0);
  fill(200);
  box(height/15, height/5, height/5);
  pop();
  angle += 0.005;














}
