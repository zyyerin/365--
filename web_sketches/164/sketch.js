let mySecond, myMinute, myHour;
let myDay, myMonth, myYear;

let t = 2;

function setup() {
  createCanvas(600, 600);
  stroke(0);
}

function draw() {
  background(255);

  mySecond = second();
  myMinute = minute();
  myHour = hour();

  t += 0.1;
  t_unit_dot(t, t, width/6*2.5);
  // t_unit_dot(2, 20, width/6);

}

function t_unit_dot(sw_, step_, size_) {
    strokeWeight(sw_);

    push();
    translate(width/2, height/2);
    for (let x = -width/2; x < width/2; x += step_) {
      for (let y = -height/2; y < height/2; y += step_) {
        // test if the dot is located in the circular area
        let xyDist = dist(x, y, 0, 0);
        if (xyDist <= size_) {
          point(x, y);
        }
      }
    }
    pop();

}
