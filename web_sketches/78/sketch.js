// slit-scan

let video;
let x = 0;
const sliceW = 50;

function setup() {
  createCanvas(600, 600);
  background(255);

  video = createVideo(['video/80.mov', 'video/80.mp4'], () => {
    video.loop();
    video.volume(0);
  });
  video.hide();
}

function draw() {
  if (!video || video.width === 0) return;

  const srcX = floor(video.width / 2);
  const h = height;

  filter(BLUR, 1);
  copy(video, srcX, 0, sliceW, video.height, x, 0, sliceW, h);

  x += sliceW;
  if (x > width) {
    x = 0;
  }
}
