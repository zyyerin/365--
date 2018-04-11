PFont f, f2;
float preX = 0, preY = 0, preX2 = 0, preY2 = 0;

int viewSize = 10;

String[] lines, lines2;
String body, body2;
String[] words, words2;
IntDict concordance, concordance2;

void setup() {
  //frameRate(5);
  background(255);
  size(400, 400);
  fill(0);

  // Moby Dick
  lines = loadStrings("mobydick.txt");
  body = join(lines, " ");
  words = splitTokens(body, " ,.!?:;()*");
  concordance = new IntDict();

  f = createFont("Clarendon", 12);
  f2 = createFont("Helvetica", 12);

  for (int i = 0; i < words.length; i ++) {
    concordance.increment(words[i].toLowerCase());
  }
  concordance.sortValuesReverse();

  // Pride and Prejudice
  lines2 = loadStrings("PrideAndPrejudice.txt");
  body2 = join(lines2, " ");
  words2 = splitTokens(body2, " ,.!?:;()*“”");
  concordance2 = new IntDict();

  for (int i = 0; i < words2.length; i ++) {
    concordance2.increment(words2[i].toLowerCase());
  }
  concordance2.sortValuesReverse();
}

void draw() {
  background(255);

  textAlign(CENTER);
  textFont(f);

  text("TOP " + viewSize + " WORDS IN", width/2, 25);
  text("MOBY DICK", width/2, 40);
  textFont(f2);

  text("PRIDE AND PREJUDICE", width/2, 55);

  String[] keys = concordance.keyArray();
  String[] keys2 = concordance2.keyArray();
  
  
  preX = 0;
  preY = 0;
  preX2 = 0;
  preY2 = 0;
  
  for (int i = 0; i < viewSize; i ++) {

    textSize(12);


    int count = concordance.get(keys[i]);

    float textY = map(count, 1000, 14010, height-10, 70);
    float textX = map(i, 0, viewSize, 15, width+10);
    textFont(f);

    text(keys[i], textX+8, textY-5);
    if (preX != 0) {
      line(preX, preY, textX, textY);
    }
    preX = textX;
    preY = textY;

    int count2 = concordance2.get(keys2[i]);

    float textY2 = map(count2, 1000, 14010, height-10, 70);
    float textX2 = map(i, 0, viewSize, 15, width+10);
    textFont(f2);
    text(keys2[i], textX2+8, textY2-5);

    if (preX2 != 0) {
      line(preX2, preY2, textX2, textY2);
    }
    preX2 = textX2;
    preY2 = textY2;

    //printArray(keys2);
  }
  viewSize = int(map(mouseY, 0, height, 1, 1000));
  //noLoop();
}