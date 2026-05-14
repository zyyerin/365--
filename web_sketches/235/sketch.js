// Falling hexagons between two vertical walls — Matter.js physics.
// Mouse-move spawns new hexagons; cap at MAX_BODIES to keep the page snappy.

const { Engine, World, Bodies, Body } = Matter;

let engine, world;
let polygons = [];
const MAX_BODIES = 120;
const borderWidth = 10;

function setup() {
  createCanvas(400, 400);
  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 0.5; // matter uses +y down; original used -0.5 with y-flipped axes

  // vertical walls
  World.add(world, [
    Bodies.rectangle(width - borderWidth / 2, height / 2, borderWidth, height, { isStatic: true }),
    Bodies.rectangle(borderWidth / 2, height / 2, borderWidth, height, { isStatic: true }),
  ]);
}

function draw() {
  background(0);
  Engine.update(engine, 1000 / 60);

  // boundaries
  noStroke();
  fill(0);
  rectMode(CENTER);
  // (drawn implicitly via fill(0) on black bg — keep them invisible like original)

  // polygons
  noFill();
  stroke(255);
  strokeWeight(1);
  for (let i = polygons.length - 1; i >= 0; i--) {
    const body = polygons[i];
    const pos = body.position;
    if (pos.y > height + 50) {
      World.remove(world, body);
      polygons.splice(i, 1);
      continue;
    }
    push();
    translate(pos.x, pos.y);
    rotate(body.angle);
    const verts = body.vertices;
    beginShape();
    for (const v of verts) {
      const lx = (v.x - pos.x) * 0.5;
      const ly = (v.y - pos.y) * 0.5;
      vertex(lx, ly);
    }
    endShape(CLOSE);
    pop();
  }
}

function mouseMoved() {
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
  const body = Bodies.fromVertices(mouseX, mouseY, [verts], { friction: 0.1, restitution: 0.2 });
  if (body) {
    Body.setVelocity(body, { x: random(-5, 5), y: random(2, 5) });
    Body.setAngularVelocity(body, random(-0.1, 0.1));
    World.add(world, body);
    polygons.push(body);
  }
}
