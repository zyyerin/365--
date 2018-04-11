Table table, table2;
int sampleSize = 100;
String titleWords;

void setup() {
  size(600, 600);
  background(255);

  table = loadTable("greatestBooksFic.csv", "header");
  table2 = loadTable("greatestBooksNon.csv", "header");
  //table.sortReverse("year");

  fill(0);
  noStroke();
  textAlign(CENTER);
}

void draw() {
  background(170);
  constrain(sampleSize, 1, 1000);

  sampleSize = int(map(mouseY, 0, height, 1, 1000));

  for (int i = 0; i < sampleSize; i ++) {
    // fiction
    TableRow row = table.getRow(i);
    String title = row.getString("title");
    String author = row.getString("author");
    int year = row.getInt("year");
    int rank = row.getInt("rank");

    float titleX = map(year, -700, 2017, 50, width-50); 
    float titleY = map(rank, 0, sampleSize, 0, height);

    // non-fiction
    TableRow row2 = table2.getRow(i);
    String title2 = row2.getString("title");
    String author2 = row2.getString("author");
    int year2 = row2.getInt("year");
    int rank2 = row2.getInt("rank");

    float titleX2 = map(year2, -700, 2017, 50, width-50); 
    float titleY2 = map(rank2, 0, sampleSize, 0, height);


    // draw

    if (mousePressed) {
      textSize(map(sampleSize, 1, 1000, 16, 8));
      fill(0);
      text(title, titleX, titleY);      
      fill(255);
      text(title2, titleX2, titleY2);
    } else {
      fill(0);
      ellipse(titleX, titleY, 5, 5);
      fill(255);
      ellipse(titleX2, titleY2, 5, 5);
    }
  }

  textSize(20);
  text(" & Non-fictions", width/2, height/2+25);
  fill(0);
  text(sampleSize + " Greatest Fictions", width/2, height/2);

  // timeline help
  textSize(12);

  int yearR = int(map(mouseX, 50, width-50, -700, 2017));
  rect(mouseX, 0, 1, height);
  ellipse(mouseX, mouseY-15, 45, 20);
  fill(255);
  text(yearR, mouseX, mouseY-11);

  //noLoop();
}