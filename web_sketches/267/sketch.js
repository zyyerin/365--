// noise-driven character cloud — each glyph drifts vertically per-frame

const s = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
let t = 0.1;

function setup() {
  createCanvas(600, 300);
  fill(0);
}

function draw() {
  background(255);
  t += 0.0002;
  if (t > 1) t = 0;

  let x = 10;
  for (let i = 0; i < s.length; i++) {
    const ts = 24 * noise(t * (i + 1));
    textSize(ts);
    const c = s.charAt(i);
    text(c, x, 250 * noise(t * (i + 1)));
    x += textWidth(c);
  }
}
