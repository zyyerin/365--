/*

2018-12-04
The Coding Train WebGL

1. OpenGL (hardware accelerated)
    -> openFrameworks (C++) / Processing <P3D>
    -> WebGL -> three.js / p5.js / ..

*/

let easyCam;

let numAlongAxis;
let boxSize = 10;
let spaceBetweenBox = 10;



let state = {
  distance: 600,
  rotation: Dw.Rotation.create({
    angles_xyz: [0, 0, 0]
  }),
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0, 0, windowWidth, windowHeight]);
}

function setup() {
  createCanvas(600, 600, WEBGL);
  easycam = new Dw.EasyCam(this._renderer, state);
  easycam.setDefaultInterpolationTime(2000); //slower transition

  numAlongAxis = 2;
}



function draw() {
  // ortho projection
  var cam_dist = easycam.getDistance();
  var oscale = cam_dist * 0.001;
  var ox = width / 2 * oscale;
  var oy = height / 2 * oscale;
  ortho(-ox, +ox, -oy, +oy, -10000, 10000);
  easycam.setPanScale(0.004 / sqrt(cam_dist));


  background(255);
  noStroke();
  translate(-spaceBetweenBox, -spaceBetweenBox);

  let fillFactor = 255 / numAlongAxis;
  let damping = 0.95;

  for (let z = 0; z < numAlongAxis; z++) {
    for (let x = 0; x < numAlongAxis; x++) {
      for (let y = 0; y < numAlongAxis; y++) {
        fill(x * fillFactor, y * fillFactor, 255, z * fillFactor);

        let releaseRate = 3;
        let releaseX = Math.pow(x - z, releaseRate);
        let releaseY = Math.pow(y - z, releaseRate);


        push();
        translate(x * spaceBetweenBox + (releaseX + releaseY / 3),
          y * spaceBetweenBox + (releaseY + releaseX / 3),
          z * spaceBetweenBox);

          box(boxSize);
        pop();
      }
    }
  }

}

function mouseReleased() {
  if (numAlongAxis < 20) {
    numAlongAxis++;
  }
}
