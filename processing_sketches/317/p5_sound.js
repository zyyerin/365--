var mic;
var fft;
var amp;
var w, sw;
var a;

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    
    mic = new p5.AudioIn();
    mic.start();
    amp = new p5.Amplitude();
    
    fft = new p5.FFT(0.9, 32);
    fft.setInput(mic);
    
    w = width/32;
    a = 0;
    sw = height/1600;
    strokeWeight(sw);
    ellipseMode(CENTER);
    
}

function draw() {
    
    var spectrum = fft.analyze();
    var vol = mic.getLevel();
    
    var alpha = map(vol, 0, 1, 5, 255);
    
    stroke(0, 100);
    fill(255, alpha);


    push();
    translate(width/2, height/2);
    rotate(a);
    a += 0.2;
    if (a >= 360) {
        a = 0;
    }
    for(var i = 0; i <= spectrum.length; i++) {
        
        var amp = spectrum[i];
        var y = map(amp, 0, 255, 0, height/2);
        var d = map(a, 0, 360, 0, w);
        
        push();
        rotate(a+10);
        ellipse(w/2+i*w, 0, d*noise(a), y);
        pop();
    }
    pop();
}