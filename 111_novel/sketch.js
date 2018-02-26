let total = 30;
let radius = 140;
let loc = new Array();

let t1, t2, t3;
let easycam;


function setup() {
  createCanvas(600, 600, WEBGL);
  easycam = createEasyCam();

  //stroke(0);
  //strokeWeight(1);
  //noFill();
  noStroke();
  fill(255);
  
  t1 = random(10);
  t2 = random(10);
  t3 = random(10);

  total = round(random(10, 60));

   for(let i = 0 ; i < total+1; i++) loc[i] = [];
}

function draw() {
  background(255);

  t1 += 0.0003;
  t2 += 0.0002;
  t3 += 0.0001;


  for (let i = 0; i <= total; i++) {
    let latitude = map(i, 0, total, 0, PI);
    for (let j = 0; j <= total; j++) {
      let longitude = map(j, 0, total, 0, TWO_PI);

      let x = sin(latitude)*cos(longitude)*radius;
      let y = sin(latitude)*sin(longitude)*radius;
      let z = cos(latitude)*radius;

      loc[i][j] = createVector(x, y, z);

      let off = createVector(noise(t1*x, t1*y, t1*z), noise(t2*y, t2*x, t2*z), noise(t3*x, t3*y, t3*z));
      off.setMag(20);
      loc[i][j].add(off);
    }
  }

  for (let i = 0; i < total; i++) {
    let col = map(i, 0, total, 5, 0);
    noFill();
    stroke(0);
    strokeWeight(col);

    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j <= total; j++) {

      let v1 = loc[i][j];
      let v2 = loc[i+1][j];

      vertex(v1.x, v1.y, v1.z);
      vertex(v2.x, v2.y, v2.z);
    }
    endShape(CLOSE);
  }

  //saveFrame("####.png");
}