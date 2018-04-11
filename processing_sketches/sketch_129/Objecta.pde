class Objecta {
  float chang, kuan, gao;
  float scale;
  int numberOfUnits;
  Objecta(float c, float k, float g, float s, int n) {
    chang = c;
    kuan = k;
    gao = g;
    scale = s;
    numberOfUnits = n;
  }

  void unita(float rx, float ry, float rz, float x, float y) {
    pushMatrix();
    translate(x, y);

    rotateX(rx);
    rotateY(ry);
    rotateZ(rz);

    pushMatrix();
    translate(-scale, 0, scale);
    box(chang, gao, kuan);  
    popMatrix();

    pushMatrix();
    translate(+scale, 0, scale);
    box(chang, gao, kuan);  
    popMatrix();

    pushMatrix();
    translate(-scale, 0, -scale);
    box(chang, gao, kuan);  
    popMatrix();

    pushMatrix();
    translate(+scale, 0, -scale);
    box(chang, gao, kuan);  
    popMatrix();

    popMatrix();
  }

  void unitb(float r) {
    rotate(r);
    
    unita(0, 0, 0, 0, 0);
    unita(0, 0, HALF_PI, 0, 0);
    unita(HALF_PI, HALF_PI, 0, 0, 0);
  }

  void display() {
    pushMatrix();
    translate(width/2, height/2);
    rotateX(a*noise(frameCount)*0.001);
    rotateY(a*noise(frameCount)*0.1);
    for (int i=0; i<numberOfUnits; i++) {
      unitb(a);
    }
    popMatrix();
  }
}