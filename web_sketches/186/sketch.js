let palette = ['#aaa', '#bbb', '#ccc', '#ddd'];
function setup() {
createCanvas(windowWidth, windowHeight);
noStroke();
}

function mouseMoved(){
  let colIdx = floor(random(palette.length));
  let col = palette[colIdx];
  fill(col);
  let s = random(15);
  ellipse(mouseX, mouseY, s,s);
}
