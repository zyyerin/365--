let offx = 0;
let offy = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(0);
  strokeWeight(10);
}

function draw() {
  background(255);


  switch(true){
    case (mouseX <= width/2):
    offx -= map(mouseX, 0, width/2, 5, 0);
    break;

    case (mouseX > width/2):
    offx += map(mouseX, width/2, width, 5, 0);
    break;
  }
  switch(true){
    case (mouseY <= height/2):
    offy -= map(mouseY, 0, height/2, 5, 0);
    break;

    case (mouseY > width/2):
    offy += map(mouseY, height/2, height, 5, 0);
    break;
  }

  // translate(mouseX+offx, mouseY+offy);
  line(mouseX, mouseY, offx, offy);
}
