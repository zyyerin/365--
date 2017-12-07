let offx = 0;
let offy = 0;

function setup() {
  createCanvas(400, 400);
  noFill();
  stroke(0);
  strokeWeight(2);
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

  let x2 = map(mouseX, 0, width, -HALF_PI, TWO_PI -HALF_PI);
  let y2 = map(mouseY, 0, height, -HALF_PI, TWO_PI -HALF_PI);
  arc(width/2, height/2, 100+offx, 100+offy, x2,  y2);
}
