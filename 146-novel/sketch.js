let a = 0;
let b = 0;
let c = 0;
let graphics;
let msg;
let s;

function preload(){
  s = loadStrings('mobydick.txt');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  tint(255);
  msg = createGraphics(600, 600);
  // msg.textAlign(CENTER);
  msg.textSize(24);
  msg.text(s, 0, 0, 600, 600);
}

function draw() {
  background(255);
  ambientLight(255);

  a = map(mouseX, 0, width, 0, TWO_PI);
  b = map(mouseY, 0, width, 0, TWO_PI);
  c += 0.003;

  rotateX(a);
  rotateY(b);
  rotateZ(c);
  texture(msg);
  box(200);

}
