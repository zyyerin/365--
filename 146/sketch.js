let a = 0;
let graphics;
let msg;
let s;

function preload(){
  s = loadStrings('mobydick.txt');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();

  msg = createGraphics(600, 600);
  // msg.textAlign(CENTER);
  msg.textSize(20);
  msg.text(s, 0, 0, 600, 600);
}

function draw() {
  // ortho();
  background(255);
  ambientLight(255);

  a += 0.004;
  rotateX(a);
  rotateY(a);
  texture(msg);
  box(200);

}
