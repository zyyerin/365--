// Falling hexagons in a fully enclosed box — Matter.js.
// Drag to spawn; cap at MAX_BODIES to keep the gallery snappy.

const { Engine, World, Bodies, Body } = Matter;

let engine, world;
let polygons = [];
const MAX_BODIES = 150;

function setup() {
  createCanvas(400, 400);
  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 1.5;

  const bw = 100;
  World.add(world, [
    Bodies.rectangle(width / 2, height - bw / 2, width, bw, { isStatic: true }),    // floor
    Bodies.rectangle(width / 2, bw / 2, width, bw, { isStatic: true }),             // ceiling
    Bodies.rectangle(width - bw / 2, height / 2, bw, height, { isStatic: true }),   // right
    Bodies.rectangle(bw / 2, height / 2, bw, height, { isStatic: true }),           // left
  ]);
}

function draw() {
  background(200);
  Engine.update(engine, 1000 / 60);

  noStroke();
  fill(0);
  rectMode(CENTER);
  const bw = 100;
  rect(width / 2, height - bw / 2, width, bw);
  rect(width / 2, bw / 2, width, bw);
  rect(width - bw / 2, height / 2, bw, height);
  rect(bw / 2, height / 2, bw, height);

  noFill();
  stroke(255);
  strokeWeight(1);
  for (let i = polygons.length - 1; i >= 0; i--) {
    const body = polygons[i];
    const pos = body.position;
    push();
    translate(pos.x, pos.y);
    rotate(body.angle);
    beginShape();
    for (const v of body.vertices) {
      vertex((v.x - pos.x) * 0.5, (v.y - pos.y) * 0.5);
    }
    endShape(CLOSE);
    pop();
  }
}

function mouseDragged() {
  if (polygons.length >= MAX_BODIES) return;
  const scale = 5;
  const s3 = Math.sqrt(3) * scale;
  const verts = [
    { x: 0, y: random(2) * scale },
    { x: s3, y: scale },
    { x: s3, y: -scale },
    { x: 0, y: random(-2) * scale },
    { x: -s3, y: -scale },
    { x: -s3, y: scale },
  ];
  const body = Bodies.fromVertices(mouseX, mouseY, [verts], { friction: 0.1, restitution: 0.3 });
  if (body) {
    Body.setVelocity(body, { x: random(-5, 5), y: random(2, 5) });
    Body.setAngularVelocity(body, random(-0.1, 0.1));
    World.add(world, body);
    polygons.push(body);
  }
}
