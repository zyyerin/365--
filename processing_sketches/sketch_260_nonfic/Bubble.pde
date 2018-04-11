class Bubble {
  Bubble() {
  }

  void display(float x, float y, int fic, String title, String author, float size) {
     stroke(0);

    if (fic == 1) {
      noFill();
    } else if(fic == 0){
     fill(0, 100);
    }
    
    ellipse(x, y, size, size);
    
    fill(0);
    textFont(titleFont);
    text(title, x, y);
    
    textFont(authorFont);
    text(author, x, y+12);
  }
}