class Objecta {
  float chang, kuan, gao;
  float scale;

  Objecta(float c, float k, float g, float s) {
    chang = c;
    kuan = k;
    gao = g;
    scale = s;
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

  void display(float x, float y, float z, float rx, float ry, float rz) {
    pushMatrix();
    translate(x, y, z);
    rotateX(rx);
    rotateY(ry);
    rotateZ(rz);
    unitb(a);
    popMatrix();
  }
}