let maxIteration = 50;
let scale = 4;


function setup() {
    createCanvas(600, 600);
    pixelDensity(1);
}

function draw() {

    loadPixels();

    for (let x = 0; x < width; x += 1) {
        for (let y = 0; y < height; y += 1) {

            let a1 = scale/3;
            let b1 = scale/2;

            let a = map(x, 0, width, a1 - scale, a1);
            let b = map(y, 0, height, b1 - scale, b1);
            let a0 = a;
            let b0 = b;

            let n = 0;
            let bright;

            let factor = map(mouseX, 0, width, 0, 3);

            while (n < maxIteration) {
                let aa = a * a + b * b;
                let bb = factor * a * b;

                a = aa + a0;
                b = bb - b0;
                if (abs(a - b) > 40) {
                    break;
                }

                n+=4;
            }

            if (n!==maxIteration){
                 bright = abs(a+b);
            } else {
                 bright = map(n, 0, maxIteration, 0, 255);
            }



            let pix = (x + y * width) * 4;
            pixels[pix + 0] = 0;
            pixels[pix + 1] = 0;
            pixels[pix + 2] = 0;
            pixels[pix + 3] = bright;
        }
    }
    updatePixels();

}