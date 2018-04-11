Table table;
int sampleSize = 0;
String titleWords;

float preX = 0; 
float preY = 0;

Bubble[] bubbles;

void setup() {
  size(600, 600);
  background(255);
  noCursor();
  table = loadTable("greatestBooksFic.csv", "header");
  //table.sortReverse("year");

  fill(0);
  noStroke();

  bubbles = new Bubble[table.getRowCount()];
  for (int i = 0; i < bubbles.length; i ++) {
    bubbles[i] = new Bubble();
  }
}

void draw() {
  background(255);

  if (sampleSize < table.getRowCount()-1) {
    sampleSize ++;
  }

  for (int i = 0; i < sampleSize; i ++) {

    // fiction
    TableRow row = table.getRow(i);
    String title = row.getString("title");
    String author = row.getString("author");
    int year = row.getInt("year");
    int rank = row.getInt("rank");

    float titleX = map(year, -700, 2017, 50, width-50); 
    float titleY = map(rank, 0, sampleSize, 0, height);

    // draw
    textSize(map(sampleSize, 1, 1000, 16, 8));

    float size = map(rank, 1, 1000, 255, 0);
    float sw = map(rank, 1, 1000, 20, 0);

    bubbles[i].display(titleX, titleY, 255-size, size, title, sw);
    noStroke();
  }

  fill(0);
  rect(42, 43, 214, 30);

  fill(255);

  textSize(18);
  text(sampleSize + " Greatest Fictions", 50, 64);

}