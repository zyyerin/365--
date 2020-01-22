// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/E1B4UoSQMFw

let angle;
let axiom = "F";
let sentence = axiom;
let len;

let rules = [];
rules[0] = {
  a: "F",
  b: "XFF+[+F+F-F]-[-F-F+F]+[+F-]-F"
};
rules[1] = {
  a: "X",
  b: "XFY"
};

function generate() {
  len *= random(0.3, 0.6);
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found){
      nextSentence += current;
    }
  }
  sentence = nextSentence;

}

function turtle() {
  background(255);
  stroke(0, 60);
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);

    switch(current){
      case "X":
        rotate(random(angle/25, angle/20));
        break;
      case "Y":
        rotate(-random(angle/15, angle/10));
        break;
      case "F":
        line(0, 0, 0, -len);
        translate(0, -len);
        break;
      case "+":
        rotate(angle);
        break;
      case "-":
        rotate(-angle)
        break;
      case "[":
        push();
        break;
      case "]":
        pop();
        break;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  angle = radians(-random(20, 40));
  len = random(200, height/4);
}

function draw(){
    for(let i=0; i<5; i++) {
      push();
      generate();

      translate(width / 2, height);
      turtle();

      pop();
    }
  noLoop();
}
