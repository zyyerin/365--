let maxIteration = 120;
let t = 0;

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
}

function draw() {
  maxIteration = noise(t) * 120;
  t += 0.1;

  loadPixels();
  // if (maxIteration < 120) {
  //   maxIteration += 0.1;
  // }

  for (let x=0; x<width; x += 1) {
    for (let y=0; y<height; y += 1){

      let a1 = map(mouseX, 0, width, -2, 2);
      let b1 = map(mouseY, 0, width, -2, 2);

      let scale = noise(t/100);

      let a = map(x, 0, width, a1-scale, a1);
      let b = map(y, 0, height, b1-scale, b1);
      let a0 = a;
      let b0 = b;

      let n = 0;
      let z = 0;

      while(n < maxIteration) {
        let aa = a*a - b*b;
        let bb = 2 * a * b;

        a = aa +a0;
        b = bb + b0;
        if (abs(a+b) > 100) {
          break;
        }

        n++;
      }

      let bright = map(n, 0, maxIteration, 255, 0);

      // if (n === maxIteration){
      //   bright = 0;
      // }

      let pix = (x+y*width) * 4;
      pixels[pix+0] = 0;
      pixels[pix+1] = 0;
      pixels[pix+2] = 0;
      pixels[pix+3] = bright;
    }
  }
  updatePixels();

}
