let offx = 0;
let offy = 0;

function setup() {
  createCanvas(600, 600);
  fill(0);
  noStroke();
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

  push();
  translate(mouseX+offx, mouseY+offy);
  ellipse(0, 0, 50, 50);
  pop();
}
