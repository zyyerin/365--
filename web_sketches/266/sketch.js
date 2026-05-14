// noise-jiggled Lorem ipsum with colored gradient bars behind each character

const s = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
let t = 0.1;

function setup() {
  createCanvas(300, 300);
  textSize(24);
}

function draw() {
  background(255);
  t += 0.0001;

  let x = 0;
  const len = s.length;
  for (let i = 0; i < len; i++) {
    const ts = 24 * noise(t * (i + 1));
    textSize(ts);
    const c = s.charAt(i);

    fill((255 * i) / len, 125);
    noStroke();
    rect(-4, 300 * noise(t * (i + 1)), height + 8, 15 * (len - i) / len);

    fill(255);
    text(c, x, 300 * noise(t * (i + 1)));
    x += textWidth(c);
  }
}
