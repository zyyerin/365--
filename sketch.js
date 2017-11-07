let xlimit;
let ylimit;
let bgCol = 233;
function setup() {
    createCanvas(windowWidth, windowHeight);
    xlimit = 60;
    ylimit = 60;
    noCursor();
    background(bgCol);

}

function draw() {
  background(bgCol);

  let posx = map(mouseX, 0, width, -xlimit, xlimit);
  let posy = map(mouseY, 0, height, -ylimit, ylimit);

  // the hole
  noStroke();
  let holeSize = 200;
  let gradientStep = 2;
  fill(0);
  ellipse(width/2, height/2, holeSize, holeSize);

  push();
  translate(width/2, height/2);
  for(let i=0; i<holeSize; i+=gradientStep){
    fill(i);
    ellipse(posx, posy, holeSize-i, holeSize-i);
  }
  pop();

  // the mover
  let centerFill = map(abs(posx)+abs(posy), 0, xlimit+ylimit, bgCol, 255);
  let scale = map(abs(posx)+abs(posy), 0, xlimit+ylimit, 1.1, 0.6);

  fill(255, centerFill);
  push();
  translate(width/2, height/2);
  ellipse(posx, posy, holeSize*scale, holeSize*scale);
  pop();

  noFill();
  stroke(bgCol);
  let sw = 150;
  strokeWeight(sw);
  ellipse(width/2, height/2, holeSize+sw, holeSize+sw);

  noStroke();
  fill(255-centerFill);
  ellipse(mouseX, mouseY, holeSize*scale/10, holeSize*scale/10);
}
