// cube size changable

int noc_x, noc_y, noc;

Cube[] cubes;
Connection[] connections;
ConnectionY[] cys;
float xstep, ystep;
PVector pos;
float cubeS;
float offset;

void setup() {
  size(600, 600);
  background(255);
  noStroke();

  noc_x = 14;
  noc_y = 14;
  noc = noc_x * noc_y;

  cubeS = 1;

  cubes = new Cube[noc];
  connections = new Connection[noc];
  cys = new ConnectionY[noc];

  xstep = width/(noc_x-1);
  ystep = height/(noc_y-1);

  offset = 0.01;
}

void draw() {
  background(255);
  pos = new PVector(0, 0);

  for (int i = 0; i < cubes.length; i++) {
    float cubeS_ = cubeS*noise(offset);
    cubes[i] = new Cube(cubeS_);
    cubes[i].display(pos);
    offset += 0.0001;
    pos.x += xstep+random(1);

    if (i%noc_x == noc_x-1) {
      pos.y += ystep+random(1); 
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
  cubeS += 0.003;
}