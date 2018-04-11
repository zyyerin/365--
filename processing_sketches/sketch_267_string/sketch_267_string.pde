PFont f;
String s = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
float t = 0.1;
void setup() {

  size(600, 300);
  f = createFont("SourceHanSansCN-Regular", 32);
  // at this rendering mode the font would be rendered dynamically as shapes
  // watch out if in 3D or other rendering modes

  textFont(f);
  fill(0);

  println(PFont.list());
}

void draw() {
  background(255);

  t += 0.0002;
  if (t > 1) {
    t = 0;
  }
  println(t);
  float x = 10;
  for (int i = 0; i < s.length(); i ++) {
    textSize(24*noise(t*(i+1)));

    char c = s.charAt(i);
    text(s.charAt(i), x, 250*noise(t*(i+1)));
    x += textWidth(c);
  }
}