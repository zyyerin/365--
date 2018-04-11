Table table;
float count;

void setup() {
  size(400, 400); 
  background(255);
  
  pixelDensity(2);
  smooth();
  textSize(12);
  textAlign(CENTER);
  fill(0);

  noStroke();
  table = loadTable("flight_simple.csv", "header");
  table.sort("date");

  count = height;
}

void draw() {

  background(255);



  for (int i = 0; i < table.getRowCount(); i ++) {

    TableRow row = table.getRow(i);
    String d = row.getString("date");
    int f = row.getInt("fat");
    //String airline = row.getString("airline");

    //d.split("-");

    float textX = map(i, 0, table.getRowCount(), 0, width);
    float es = map(f, 0, 2000, 0, height) * count;
    count *= 0.99995;

    text("fatal commercial passenger plane crashes since 1993 ", width/2, height/2);
    text(d, textX, es);
  }

  //noLoop();
}