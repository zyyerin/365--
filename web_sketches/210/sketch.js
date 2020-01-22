let input;
let button;
let para;

const LEXICON = new RiLexicon();

function setup() {
    noCanvas();
    input = createInput('There is only one good, knowledge, and one evil, ignorance.');
    button = createButton('>>>');
    input.changed(processRita);
    button.mousePressed(processRita);
    input.size(320);
}

function processRita() {

  removeElements();

  let s = input.value();
  let rs = new RiString(s);
  let words = rs.words();
  let pos = rs.pos();

  let output = '';
  for (let i=0; i<words.length; i++) {
    if (i===0){
      output += words[i];
    } else if (words[i] === ',' || words[i] === '.') {
      output += words[i];
    } else if (/nn.*/.test(pos[i])) {
      output += ' ';
      output += LEXICON.randomWord(pos[i]);
    }else {
      output += ' ';
      output += words[i];
    }

  }
  para = createP(output);
}
