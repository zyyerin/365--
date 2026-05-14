// thick translucent stroke sweeping vertically; eventually flips to thin white

let a = 0;
let count = 0;
let alpha = 0;
let sw = 66;
let strokeAlpha = 10;
let useWhite = false;

function setup() {
  createCanvas(600, 600);
  background(255);
}

function draw() {
  a += 0.03;
  const h = map(sin(a), -1, 1, 0, height);
  noFill();
  if (useWhite) stroke(255, alpha);
  else stroke(0, strokeAlpha);
  strokeWeight(sw);
  line(0, height / 2, width, h);

  if (h >= height - 1) count++;
  if (count >= 10) {
    alpha++;
    useWhite = true;
    sw = 5;
  }
}
