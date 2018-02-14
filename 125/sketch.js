let maxIteration = 50;

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
}

function draw() {
  loadPixels();
  // if (maxIteration < 120) {
  //   maxIteration += 0.1;
  // }

  for (let x=0; x<width; x += 1) {
    for (let y=0; y<height; y += 1){

      let a1 = map(mouseX, 0, width, -2, 2);
      let b1 = map(mouseY, 0, width, -2, 2);

      let a = map(x, 0, width, a1-0.1, a1);
      let b = map(y, 0, height, b1-0.1, b1);
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

      let bright = map(n, 0, maxIteration, 0, 255);

      if (n === maxIteration){
        bright = 0;
      }

      let pix = (x+y*width) * 4;
      pixels[pix+0] = 51;
      pixels[pix+1] = 51;
      pixels[pix+2] = 51;
      pixels[pix+3] = bright;
    }
  }
  updatePixels();

}
