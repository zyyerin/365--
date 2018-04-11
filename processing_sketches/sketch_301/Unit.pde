class Unit {
  int step_s, step_l;
  int off;

  PVector a1, a2, a3, a4;
  PVector b1, b2, b3, b4;
  PVector c1, c2, c3, c4;


  Unit(PVector in0, PVector in1, PVector in2) {
    a1 = in0;
    a2 = in1;
    a4 = in2;
    
    step_s = 50;
    step_l = 100;
    off = 10;

    generatePoint();
  }

  Unit() {
    a1 = new PVector(0, 0);
    a2 = new PVector(50, 0);
    a4 = new PVector(0, 50);

    step_s = 50;
    step_l = 100;
    off = 10;

    generatePoint();
  }

  void generatePoint() {
    a3 = new PVector(random(step_s-off, step_s+off), random(step_s-off, step_s+off));

    b1 = a2;
    b4 = a3;

    b2 = new PVector(random(step_l-off, step_l+off), 0);
    b2.add(a2);
    b3 = new PVector(random(step_l-off, step_l+off), 0);
    b3.add(a3);



    c1 = a4;
    c2 = a3;

    c4 = new PVector(0, random(step_l-off, step_l+off));
    c4.add(a4);
    c3 = new PVector(0, random(step_l-off, step_l+off));
    c3.add(a3);
  }


  void display() {
    fill(0, 150);
    beginShape();
    vertex(a1.x, a1.y);
    vertex(a2.x, a2.y);
    vertex(a3.x, a3.y);
    vertex(a4.x, a4.y);
    endShape();

    fill(0, 255, 255, 150);
    beginShape();
    vertex(b1.x, b1.y);
    vertex(b2.x, b2.y);
    vertex(b3.x, b3.y);
    vertex(b4.x, b4.y);
    endShape();

    fill(255, 0, 255, 150);
    beginShape();
    vertex(c1.x, c1.y);
    vertex(c2.x, c2.y);
    vertex(c3.x, c3.y);
    vertex(c4.x, c4.y);
    endShape();

    stroke(255, 0, 0);
    strokeWeight(10);
    point(a4.x, a4.y);
    noStroke();
  }
}