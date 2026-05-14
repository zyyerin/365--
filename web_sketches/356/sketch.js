// 500 stacked thin rectangles rotated around y, building a swirl tower

function setup() {
  createCanvas(666, 666, WEBGL);
  background(0);
}

function draw() {
  // dark trail (background but only partial alpha-clear)
  noStroke();
  fill(0, 5);
  rect(-width / 2, -height / 2, width, height);

  translate(0, 0, -300);
  const rot = frameCount;
  rotateX(radians(rot / 60.0 * 10));
  rotateY(radians(rot / 60.0 * 10));

  rectMode(CORNER);
  for (let i = 0; i < 500; i++) {
    stroke(map(i % 10, 0, 10, 0, 100));
    fill(255, 10);
    rect(100, 100, i, 500 - i);
    rotateY(radians(270.0 / 50));
  }
}
