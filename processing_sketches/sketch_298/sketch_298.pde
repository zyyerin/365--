Cube[] cubes;
Connection[] connections;
ConnectionY[] cys;
float step;
PVector pos;
float cubeS;
float offset;

int noc_x = 10;
void setup() {
  size(600, 600);
  background(255);
  noStroke();
  cubes = new Cube[100];
  connections = new Connection[noc_x*noc_x];
  cys = new ConnectionY[noc_x*noc_x];
  step = width/(noc_x-1);

  offset = 0.01;
}

void draw() {
  background(255);
  pos = new PVector(0, 0);

  for (int i = 0; i < cubes.length; i++) {

    cubeS = 30*noise(offset);
    cubes[i] = new Cube(cubeS);
    cubes[i].display(pos);
    offset += 0.0001;
    pos.x += step+random(1);

    if (i%noc_x == noc_x-1) {
      pos.y += step+random(1); 
      pos.x = 0;
    }
  }



  for (int i = 1; i < connections.length; i++) {
    connections[i] = new Connection(cubes[i-1], cubes[i]);
  }

  for (int i = noc_x; i < cys.length; i++) {
    cys[i] = new ConnectionY(cubes[i-noc_x], cubes[i]);
  }
}