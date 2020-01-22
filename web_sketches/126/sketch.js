function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  loadPixels();
  let maxIteration = 100;
  for (let x=0; x<width; x++) {
    for (let y=0; y<height; y++){

      let a = map(x, 0, width, -0.65, -0.55);
      let b = map(y, 0, height, -0.65, -0.55);
      let a0 = a;
      let b0 = b;

      let n = 0;
      let z = 0;

      while(n < maxIteration) {
        let aa = a*a - b*b;
        let bb = 2 * a * b;

        a = aa +a0;
        b = bb + b0;
        if (abs(a+b) > 5) {
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
