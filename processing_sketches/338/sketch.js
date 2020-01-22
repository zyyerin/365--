// module aliases
var Engine = Matter.Engine,
//    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];

var ground;

var Y_AXIS = 1;
var X_AXIS = 2;
var b1, b2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    
    ground = Bodies.rectangle(200, height, width, 1, { isStatic: true });
    World.add(world, ground);
    
    b1 = color(30);
    b2 = color(0);
    noCursor();
    
}

function mouseDragged() {
    boxes.push(new Box(mouseX, mouseY, random(160), 20));
}

function draw() {
    background(10);
      setGradient(0, 0, width, height, b1, b2, Y_AXIS);

    for (var i = 0; i < boxes.length; i++){
       boxes[i].show();
    }
}

function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}