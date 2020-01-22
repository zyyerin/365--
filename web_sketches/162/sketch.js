let mySecond, myMinute, myHour;
let myDay, myMonth, myYear;

let t = 10;
let mss = 0.1;
let tlimit = 20;

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  fill(0);
  noStroke();
  mySecond = second();
}

function draw() {
  background(255);

  // mySecond = second();
  myMinute = minute();
  myHour = hour();

  // t += 0.001;

  mySecond += mss;
  if (mySecond >= 60 || mySecond <= 0) {
    mss *= -1;
  }

  t = map(mySecond, 0, 60, 14, tlimit);
  tlimit = 30;
  // tlimit = map(mouseY, 0, height, 15, 35);

  t_unit_dot(1, t + 1, width / 12 * 5);
  t_unit_dot(2, t + 2, width / 12 * 4);
  t_unit_dot(3, t + 3, width / 12 * 3);
  t_unit_dot(5, t + 5, width / 12 * 2);
  t_unit_dot(8, t + 8, width / 12 * 1);
  t_unit_dot(13, t + 13, width / 24);

  t_unit_dot(1, t - 1, width / 12 * 5);
  t_unit_dot(2, t - 2, width / 12 * 4);
  t_unit_dot(3, t - 3, width / 12 * 3);
  t_unit_dot(5, t - 5, width / 12 * 2);
  t_unit_dot(8, t - 8, width / 12 * 1);
  t_unit_dot(13, t - 13, width / 24);

}

function t_unit_dot(sw_, step_, size_) {
  // strokeWeight(sw_);

  push();
  translate(width / 2, height / 2);
  for (let x = -width / 2; x < width / 2; x += step_) {
    for (let y = -height / 2; y < height / 2; y += step_) {
      // test if the dot is located in the circular area
      let xyDist = dist(x, y, 0, 0);
      if (xyDist <= size_) {
        rotate(x*0.00005);
        rect(x, y, sw_, 1);
      } else if (x > 0) {
        continue;
      }

    }
  }
  pop();
}
