let mySecond, myMinute, myHour;
let myDay, myMonth, myYear;


function setup() {
  createCanvas(windowWidth, windowHeight);
  // frameRate(1);
  rectMode(CENTER);

  // myDay = day();
  // myMonth = month();
  // myYear = year();
}

function draw() {
  // background(255);
  noStroke();
  fill(255, 10);
  rect(width/2, height/2, width, height);

  mySecond = second();
  myMinute = minute();
  myHour = hour();

  // text(myHour + ":" + myMinute + ":" + mySecond, 5, 50);

  let rectC = map(myHour, 0, 24, 255, 0);
  let rectW = map(myMinute*60+mySecond, 0, 3600, 1, width/2);
  let rectA = map(mySecond, 0, 60, 0, TWO_PI);

  stroke(0, rectC);
  noFill();

  push();
  translate(width/2, height/2);
  rotate(rectA);
  rect(0, 0, rectW, rectW);
  pop();
}
