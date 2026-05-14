// single dot orbiting + pulsing — fades the trail with a translucent overlay

let angle = 0;
let s = 1;
let r = 0;

function setup() {
  createCanvas(600, 600);
  background(255);
}

function draw() {
  fill(255, 5);
  noStroke();
  rect(0, 0, width, height);

  fill(0);
  push();
  translate(width / 2, height / 2);

  const posy = r * sin(angle);
  const posx = r * cos(angle);
  ellipse(posx, posy, s, s);
  angle += 0.1;

  r = map(noise(angle), 0, 1, -10, 10) + 100;

  if (s <= 10) s += random(-1, 1);
  else s -= random(7);

  pop();
}
