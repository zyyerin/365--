// cube size changable

int noc_x, noc_y, noc;

Cube[] cubes;
Connection[] connections;
ConnectionY[] cys;
float xstep, ystep;
PVector pos;
float cubeS;
PVector offset;

void setup() {
  size(600, 600);
  background(255);
  noStroke();

  noc_x = 14;
  noc_y = 14;
  noc = noc_x * noc_y;

  cubeS = 10;

  cubes = new Cube[noc];
  connections = new Connection[noc];
  cys = new ConnectionY[noc];

  xstep = width/(noc_x-1);
  ystep = height/(noc_y-1);

}

void draw() {
  background(255);
  pos = new PVector(0, 0);
  
  float mx = map(mouseX, 0, width, -cubeS, cubeS);
  float my = map(mouseY, 0, height, -cubeS, cubeS);
  
  offset = new PVector(mx, my);

  for (int i = 0; i < cubes.length; i++) {
    float cubeS_ = cubeS+mx+my;
    cubes[i] = new Cube(cubeS_, offset);
    cubes[i].display(pos);
    
    pos.x += xstep;

    if (i%noc_x == noc_x-1) {
      pos.y += ystep; 
      pos.x = 0;
    }

    dataUpdate();
  }



  for (int i = 1; i < connections.length; i++) {
    connections[i] = new Connection(cubes[i-1], cubes[i]);
  }

  for (int i = noc_x; i < cys.length; i++) {
    cys[i] = new ConnectionY(cubes[i-noc_x], cubes[i]);
  }
}

void dataUpdate() {
  //cubeS += 0.003;
  //offset.normalize();
}