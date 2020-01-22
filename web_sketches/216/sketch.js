let num;
let from;
let to;

let t;
let offsetScale;

let randy0,randy1, randy2,randy3, randy4,randy5;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  colorMode(RGB);
  noStroke();
  num = 100;
  t = 0;

  offsetScale = random(100, 300);

  randy0 = random(10);
  randy1 = random(10);
  randy2 = random(10);
  randy3 = random(10);
  randy4 = random(10);
  randy5 = random(10);
}

function draw() {
  background(0);
  from = color(255);
  to = color(0);

  t += 0.05;
  // strokeWeight(noise(t)*5);

  // strokeWeight(1);
  let offset = noise(frameCount / 100) * offsetScale;
  let offset1 = noise(mouseX / 500) * offsetScale;
  let offset2 = noise(mouseY / 500) * offsetScale;

  for (let i = 0; i < num; i++) {
    let y = i * height / num;
    stroke(lerpColor(from, to, i / num));

    strokeWeight(3);
    line(0, y + offsetScale * randy5, width, y + offset+ offsetScale * 5);

    strokeWeight(2);
    line(0, y + offsetScale * randy4, width, y + offset1+ offsetScale * 4);
    strokeWeight(1.5);

    line(0, y + offsetScale * randy3, width, y + offset+ offsetScale * 3);
    strokeWeight(1);

    line(0, y + offsetScale * randy2, width, y + offset2 + offsetScale * 2);
    strokeWeight(0.5);

    line(0, y + offsetScale * randy1, width, y + offset + offsetScale * 1);
    strokeWeight(0.1);

    line(0, y + offsetScale * randy0, width, y + offset1 + offsetScale * 0);
    strokeWeight(0.01);

    line(0, y + width, y + offset1 + offsetScale * 0);
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
