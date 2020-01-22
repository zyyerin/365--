let para;
let s, rs, pos;
let words;
let nnNum = 0;

const LEXICON = new RiLexicon();

function preload(){
  s = loadStrings('mobydick.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  processRita();
}

function draw() {
  background(255);
  for (let i=0; i<words.length; i++) {
    text(words[i], noise(frameCount/((i+1)*10))*width, noise(frameCount/((i+1)*i))*height);
  }
}

function processRita() {
  rs = new RiString(s[0]);
  words = rs.words();
  pos = rs.pos();

  // for (let i=0; i<words.length; i++) {
  //   switch(pos[i]){
  //     case ',':
  //     case ';':
  //     case '.':
  //     createDiv('').addClass('end');
  //     break;
  //     case 'cc':
  //       createDiv('').addClass('cc tri');
  //       break;
  //     case 'cd':
  //       createDiv('').addClass('cd tri');
  //       break;
  //     case 'nn':
  //     case 'nns':
  //       createDiv('').addClass('nn');
  //       nnNum ++;
  //       print(nnNum);
  //
  //       break;
  //     case 'nnp':
  //     case 'nnps':
  //       createDiv('').addClass('nnp');
  //       break;
  //     case 'vb':
  //     case 'vbd':
  //     case 'vbg':
  //     case 'vbn':
  //     case 'vbp':
  //     case 'vbz':
  //       createDiv('').addClass('vb');
  //       break;
  //     case 'prp':
  //       createDiv('').addClass('prp');
  //       break;
  //     case 'jj':
  //     case 'jjr':
  //     case 'jjs':
  //       createDiv('').addClass('jj');
  //       break;
  //     default:
  //       print(pos[i]);
  //       createDiv('').addClass('not');
  //   }
  // }
}
