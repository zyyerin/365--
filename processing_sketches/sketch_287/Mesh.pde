class Mesh {
  int noc_x, noc_y, noc;

  Cube[] cubes;
  Connection[] connections;
  ConnectionY[] cys;
  float xstep, ystep;
  PVector pos;
  float cubeS;
  PVector offset;
  
  color connectionC;

  Mesh(float cubeS_, int display_x, int display_y) {
    noc_x = 20;
    noc_y = 20;
    noc = noc_x * noc_y;

    cubeS = cubeS_;

    cubes = new Cube[noc];
    connections = new Connection[noc];
    cys = new ConnectionY[noc];

    xstep = display_x/(noc_x-1);
    ystep = display_y/(noc_y-1);
    
  }

  // (color of the cube, color of connections)
  void display(color clr, color connectionC) {
        
    pos = new PVector(0, 0);

    float mx = 0;
    float my = 0;
    offset = new PVector(mx, my);

    for (int i = 0; i < cubes.length; i++) {
      float cubeS_ = cubeS+mx+my;
      cubes[i] = new Cube(cubeS_, offset, clr);
      cubes[i].display(pos);

      pos.x += xstep;

      if (i%noc_x == noc_x-1) {
        pos.y += ystep; 
        pos.x = 0;
      }

      dataUpdate();
    }


    for (int i = 1; i < connections.length; i++) {
      connections[i] = new Connection(cubes[i-1], cubes[i], connectionC);
    }

    for (int i = noc_x; i < cys.length; i++) {
      cys[i] = new ConnectionY(cubes[i-noc_x], cubes[i], connectionC);
    }
  }


  void dataUpdate() {
    //cubeS += 0.003;
    //offset.normalize();
    //xstep = map(mouseX, 0, width, 0, 200);
    //ystep = map(mouseY, 0, height, 0, 200);
    //xstep = 30;
    //ystep = 30;
    //cubeS = 5;
    //cubeS = map(mouseX, 0, width, 50, width/2);
  }
}