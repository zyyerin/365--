// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/kKT0v3qhIQY

let tree;
let max_dist = 100;
let min_dist = 10;

function setup() {
  createCanvas(windowWidth, 600);
  rectMode(CENTER);
  tree = new Tree();
}

function draw() {
  background(0);
  tree.show();
  tree.grow();
}