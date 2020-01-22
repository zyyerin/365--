var img;
var pixelStep = 1;
var margin;
let t = 0;
let t2 = 0;


function preload() {
    img = loadImage("assets/1.png");
}

function setup() {
    createCanvas(600, 600);
    pixelDensity(1);
}

function draw() {
    background(255);

    loadPixels();
    margin = 80;
    for (let i = 0; i < 3; i ++) {
        for (let x = i*margin; x < width - i*margin; x += pixelStep) {
            for (let y = i*margin; y < height - i*margin; y += pixelStep) {
                let index = (x + y * width) * 4;
                pixels[index] = 0;
                pixels[index + 1] = 0;
                pixels[index + 2] = 0;
                if (i % 2 != 0) {
                    pixels[index + 3] = map(mouseX, 0, width, 0, 255/i);
                } else {
                    pixels[index + 3] = map(mouseY, 0, width, 0, 255/(i+1));
                }
            }
        }
    }

    // for (let i = 0; i < 1; i++) {
    //     for (let x = i * margin; x < width - i * margin; x += pixelStep) {
    //         for (let y = i * margin; y < height - i * margin; y += pixelStep) {
    //             let index = (x + y * width) * 4;
    //             pixels[index] = 0;
    //             pixels[index + 1] = 0;
    //             pixels[index + 2] = 0;

    //             if (y * x > mouseX*mouseY) {
    //                 pixels[index + 3] = map(mouseX, 0, width, 255,0);
    //             } else {
    //                 pixels[index + 3] = map(mouseY, 0, width,0, 255);
    //             }

    //         }
    //     }
    // }


    // for (let i = 0; i < 1; i++) {
    //     for (let x = i * margin; x < width - i * margin; x += pixelStep) {
    //         for (let y = i * margin; y < height - i * margin; y += pixelStep) {
    //             let index = (x + y * width) * 4;
    //             pixels[index] = 0;
    //             pixels[index + 1] = 0;
    //             pixels[index + 2] = 0;
    //             pixels[index + 3] = map(x * y, 0, width * noise(t) * height, 0, 255);
    //         }
    //     }
    // }

    // t += 0.03;
    updatePixels();

}