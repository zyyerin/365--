let centX, centY;

let radius = 10;
let x, y;
let lastx = -999;
let lasty = -999;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  centX = width / 2;
  centY = height / 2;
}

function draw() {

  let radStep = random(0.5);
  let radiusNoise = random(10);

  for (let ang = 0; ang <= 360; ang += 5) {
    radiusNoise += 0.05;
    radius += 0.01;
    let thisRadius = radius + (noise(radiusNoise) * 200) - 100;
    let rad = radians(ang);
    x = centX + (thisRadius * cos(rad));
    y = centY + (thisRadius * sin(rad));

    stroke(random(255));

    if (lastx > -999) {
      line(x, y, lastx, lasty);
    }

    lastx = x;
    lasty = y;
  }
}
