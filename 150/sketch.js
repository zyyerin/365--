let a = 0;
let img;

function preload() {
  img = loadImage("imgs/img0.png");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
}

function draw() {
  ambientLight(255);    // light from everywhere
  // pointLight(255, 0, 0, -width/2, 0, 0);
  // pointLight(0, 0, 255, width/2, 0, 0);
  // lights();

  background(200);

// ASSIGN MATERIAL
  // fill(255, 0, 0);   // basic material
  // normalMaterial();
  ambientMaterial(255, 255, 255);   // material that reflects light
  // specularMaterial(255, 255, 255);    // metal

// SHAPE CREATION
  // shape1
  push();
  translate(-300, 0, 0);
  rotateY(a);
  box(10, 25, 50);

  torus(50, 5);
  pop();

  // shape2
  push();

  translate(-150, 0, 0);
  rotateY(a);

  ellipsoid(10, 50, 25);
  pop();

  // shape3
  push();
  rotateY(a);

  translate(0, 25, 0);
  rotateX(PI);
  cone(20, 100);

  translate(0, 60, 0);
  sphere(25);
  translate(0, 25, 0);
  sphere(25, 6, 6);
  translate(0, 25, 0);
  sphere(25, 3, 3);
  pop();

  // shape4
  push();

  translate(150, 0, 0);
  rotateX(a);

  cylinder(10, 50);

  translate(0, -25, 0);
  cylinder(25, 10, 8, 1);
  pop();

  // shape5
  push();
  translate(300, 0, 0);
  rotateY(a);

  plane(80, 45);
  pop();

// UPDATE ANGLE
  a += 0.01;


}

function lights() {
  ambientLight(0, 0, 255);

  // direction light
  let dx = mouseX - width/2;
  let dy = mouseY - height/2;
  let v = createVector(dx, dy, 0);
  v.normalize();
  directionalLight(255, 0, 255, v);
}
