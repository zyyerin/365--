// this is a sketch based on the previous one
// following Interm. Processing for Data Viz tutorial on vimeo by matthew epler

Table table;
int sampleSize = 20;
String filename = "greatestBooks10.csv";
PFont titleFont, authorFont;

Bubble[] bubbles;

void setup() {
  size(600, 600);
  background(255);

  // font 
  titleFont = createFont("Roboto-Italic", 10);
  authorFont = createFont("Roboto-Regular", 10);
  textAlign(CENTER);

  loadData();
}

void draw() {
  background(255);

  processData();
  interfaceDisplay();
  
  noLoop();
}

void loadData() {
  table = loadTable(filename, "header");
  //table.sortReverse("year");
  bubbles = new Bubble[table.getRowCount()];
  for (int i = 0; i < bubbles.length; i ++) {
    bubbles[i] = new Bubble();
  }
}

void processData() {
  for (int i = 0; i < sampleSize; i ++) {

    TableRow row = table.getRow(i);
    String title = row.getString("title");
    String author = row.getString("author");
    int year = row.getInt("year");
    int rank = row.getInt("rank");
    float wordCount = map(row.getInt("word count"), 10000, 130000, 0, 15);

    float titleX = map(year, -1000, 2500, 30, width-30); 
    float titleY = map(rank, 0, sampleSize/2+1, 80, height-30);

    int fictional = row.getInt("fiction");

    bubbles[i].display(titleX, titleY, fictional, title, author, wordCount);
  }
}

void interfaceDisplay() {
  // title
  stroke(0);
  line(30, height-30, width-30, height-30);
  line(30, 80, 30, height-30);

  // scale
  fill(0);
  textSize(20);
  text(sampleSize + " GREATEST BOOKS", 129, 36);

  rect(30, 66, 44, 23);
  rect(526, 547, 44, 23);

  fill(255);
  textSize(13);
  text("best", 53, 82);
  text("today", 549, 563);
}