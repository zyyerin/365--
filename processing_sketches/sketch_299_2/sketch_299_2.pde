Cube[] cubes;
Connection[] connections;
ConnectionY[] cys;
float xstep, ystep;
PVector pos;
float cubeS;
void setup() {
  size(600, 600);
  background(255);
  noStroke();
  cubes = new Cube[30];
  connections = new Connection[20];
  cys = new ConnectionY[20];
  xstep = 120;
  ystep = 0;

  pos = new PVector(0, 0);
}

void draw() {

  for (int i = 0; i < cubes.length; i++) {

    cubeS = random(50);
    cubes[i] = new Cube(cubeS);
    cubes[i].display(pos);

    pos.x += xstep;

    if (i%5 == 4) {
      pos.y += 150; 
      pos.x = 0;
    }
  }
  
  
  
  for (int i = 1; i < connections.length; i++) {
    connections[i] = new Connection(cubes[i-1], cubes[i]);
  }

  for (int i = 5; i < cys.length; i++) {
    cys[i] = new ConnectionY(cubes[i-5], cubes[i]);
  }
}