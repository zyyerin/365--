class Unit {
  PVector in0, in1, in2;
  PVector out0, out1, out2, out3, out4;
  int step_s, step_l;
  int off;

  Unit(PVector in0_, PVector in1_, PVector in2_) {
    in0 = in0_;
    in1 = in1_;
    in2 = in2_;

    step_s = 50;
    step_l = 100;
    off = 10;

    outGenerator();
  }
  
  Unit() {
    in0 = new PVector(0, 0);
    in1 = new PVector(50, 0);
    in2 = new PVector(0, 50);

    step_s = 50;
    step_l = 100;
    off = 10;

    outGenerator();
  }

  void outGenerator() {
    out0 = new PVector(random(step_s-off, step_s+off), random(step_s-off, step_s+off));

    out1 = new PVector(random(step_l-off, step_l+off), 0);
    out1.add(in1);

    out2 = new PVector(random(step_l-off, step_l+off), 0);
    out2.add(out0);

    out3 = new PVector(0, random(step_l-off, step_l+off));
    out3.add(in2);

    out4 = new PVector(0, random(step_l-off, step_l+off));
    out4.add(out0);
  }
  void display() {
    fill(0);
    beginShape();
    vertex(in0.x, in0.y);
    vertex(in1.x, in1.y);
    vertex(out0.x, out0.y);
    vertex(in2.x, in2.y);
    endShape();

    fill(0, 255, 255);
    beginShape();
    vertex(in1.x, in1.y);
    vertex(out1.x, out1.y);
    vertex(out2.x, out2.y);
    vertex(out0.x, out0.y);
    endShape();

    fill(255, 0, 255);
    beginShape();
    vertex(in2.x, in2.y);
    vertex(out0.x, out0.y);
    vertex(out4.x, out4.y);
    vertex(out3.x, out3.y);
    endShape();
  }
}