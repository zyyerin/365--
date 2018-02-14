let mySecond, myMinute, myHour;
let myDay, myMonth, myYear;

let intervalX;
const sw = 1;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);

  mySecond = second();
  myMinute = minute();
  myHour = hour();
  myDay = day();
  myMonth = month();
  myYear = year();

  // text(myHour + ":" + myMinute + ":" + mySecond, 5, 50);

  // let ellipseC = map(myHour, 0, 24, 255, 0);
  let ellipseC = 0;
  let ellipseA = map(mySecond, 0, 60, 0, TWO_PI);
  let baseW = width/2;

  push();
  translate(width/2, height/2);

  t_unit(frameCount*0.0001, ellipseC, baseW, myYear-2000);
  t_unit(frameCount*0.0002, ellipseC, baseW/6*5, myMonth);
  t_unit(frameCount*0.0003, ellipseC, baseW/6*4, myDay);

  t_unit(frameCount*0.0004, ellipseC, baseW/6*3, myHour);
  t_unit(frameCount*0.0005, ellipseC, baseW/6*2, myMinute);
  t_unit(frameCount*0.001, ellipseC, baseW/6, mySecond);

  pop();
}

function t_unit(a, c, w, num) {
  rotate(a);

  noStroke();
  fill(255);
  ellipse(0, 0, w*2, w*2);
  stroke(c);
  strokeWeight(sw);

  intervalX = w/num;

  for(let i=1; i<num; i++) {
    line(i*intervalX, sw/2, i*intervalX, sqrt(sq(w)-sq(i*intervalX)));
  }
  for(let i=1; i<num; i++) {
    line(i*intervalX, 0, i*intervalX, -sqrt(sq(w)-sq(i*intervalX)));
  }
  for(let i=0; i<num; i++) {
    line(-i*intervalX, sw/2, -i*intervalX, sqrt(sq(w)-sq(i*intervalX)));
  }
  for(let i=0; i<num; i++) {
    line(-i*intervalX, 0, -i*intervalX, -sqrt(sq(w)-sq(i*intervalX)));
  }
}
