PFont f;
String s = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
float t = 0.1;
void setup() {

  size(300, 300);
  f = createFont("SourceHanSansCN-Regular", 32);
  // at this rendering mode the font would be rendered dynamically as shapes
  // watch out if in 3D or other rendering modes

  textFont(f);

  //println(PFont.list());
}

void draw() {
  background(255);

  t += 0.0001;
  //if (t > 1) {
  //  t = 0;
  //}

  //println(t);

  float x = 0;
  int stringLength = s.length();
  for (int i = 0; i < stringLength; i ++) {
    textSize(24*noise(t*(i+1)));
    char c = s.charAt(i);

    fill(255*i/stringLength,125);
    noStroke();
    //stroke(0);
    rect(-4, 300*noise(t*(i+1)), height+8, 15*(stringLength-i)/stringLength);

    fill(255);
    text(s.charAt(i), x, 300*noise(t*(i+1)));
    x += textWidth(c);
  }
}