/*

2018-12-10
The Coding Train WebGL

materials and lights

*/

let easyCam;

let numAlongAxis = 10;
let boxSize = 5;
let spaceBetweenBox = 10;

let state = {
  distance: 600,
  rotation: Dw.Rotation.create({
    angles_xyz: [0, 45, 0]
  })
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0, 0, windowWidth, windowHeight]);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  easycam = new Dw.EasyCam(this._renderer, state);
  easycam.setDefaultInterpolationTime(1400); //slower transition
}



function draw() {
  // ortho projection
  var cam_dist = easycam.getDistance();
  var oscale = cam_dist * 0.001;
  var ox = width / 2 * oscale;
  var oy = height / 2 * oscale;
  ortho(-ox, +ox, -oy, +oy, -10000, 10000);
  easycam.setPanScale(0.004 / sqrt(cam_dist));

  // bg setupp
  background(255);
  let v = createVector(-0.5, 0.5, 0);
  v.normalize();
  directionalLight(150, 150, 150, v);
  pointLight(200, 200, 200, mouseX - width / 2, mouseY - height / 2, 0);
  ambientLight(50);

  noStroke();
  translate(-(numAlongAxis+1) * spaceBetweenBox * 0.5, -numAlongAxis * spaceBetweenBox * 0.5, 0);
  for (let z = round(-numAlongAxis/2); z < numAlongAxis/2; z++) {
    for (let x = 0; x < numAlongAxis; x++) {
      for (let y = 0; y < numAlongAxis; y++) {

        let releaseRateX = 0;
        let releaseRateY = 0;
        let releaseX = Math.pow(x - z, releaseRateX);
        let releaseY = Math.pow(y - z, releaseRateY);

        let materialFactor = (x + y + z) % 2;
        if (materialFactor == 0) {
          specularMaterial(255);
        } else {
          ambientMaterial(255);
        }

        push();
        translate(x * spaceBetweenBox + (releaseX + releaseY / 3),
          y * spaceBetweenBox + (releaseY + releaseX / 3),
          z * spaceBetweenBox);

        box(boxSize);
        pop();
      }
    }
  }
  // t += 0.001;
}
