let para;
let s;
const LEXICON = new RiLexicon();

function preload(){
  s = loadStrings('mobydick.txt');
}

function setup() {
    noCanvas();
    processRita();
}

function processRita() {
  // let s = input.value();

  print(s);

  let rs = new RiString(s[0]);
  let words = rs.words();
  let pos = rs.pos();

  for (let i=0; i<words.length; i++) {
    switch(pos[i]){
      case ',':
      case ';':
      case '.':
      createDiv('').addClass('end');
      break;
      case 'cc':
        createDiv('').addClass('cc tri');
        break;
      case 'cd':
        createDiv('').addClass('cd tri');
        break;
      case 'nn':
      case 'nns':
        createDiv('').addClass('nn');
        break;
      case 'nnp':
      case 'nnps':
        createDiv('').addClass('nnp');
        break;
      case 'vb':
      case 'vbd':
      case 'vbg':
      case 'vbn':
      case 'vbp':
      case 'vbz':
        createDiv('').addClass('vb');
        break;
      case 'prp':
        createDiv('').addClass('prp');
        break;
      case 'jj':
      case 'jjr':
      case 'jjs':
        createDiv('').addClass('jj');
        break;
      default:
        print(pos[i]);
        createDiv('').addClass('not');
    }
  }
}
