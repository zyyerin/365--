PFont f;

String[] lines;
String body;
String[] words;

int index = 0;
int textY = 10;

void setup() {
  background(255);
  size(600, 600);
  fill(0);
  //frameRate(30);
  textAlign(CENTER);

  //println(PFont.list());

  lines = loadStrings("mobydick.txt");
  body = join(lines, " ");
  words = splitTokens(body, " ,.!?:;");
  printArray(words);

  f = createFont("Clarendon", 10);
  textFont(f);
}

void draw() {
  //background(255);
  pushMatrix();
  
  translate(width/2, textY);
  rotate(words.length/360 * index);
  text(words[index].toUpperCase(), 0, 0);
  popMatrix();
  
  textY += 12;
  if (textY > height) {
    textY = 10; 
  }
  
  index ++;
  if (index >= words.length) {
    noLoop();
  }
}
