// Final Project
// Liam Gareau
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let elements = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  let aCarbon = new Carbon(width/2, height/2, "black", 15);
  elements.push(aCarbon);
}

function draw() {
  background(220);

  for (let element of elements) {
    element.display();
    element.move();
  }
}

class Elements {
  constructor(x, y, color, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  display() {
    fill(this.color);
    noStroke();
    circle(this.x, this.y, this.radius*2);
  }

  move() {
    mousePressed(this.x, this.y, this.radius);
  }
}

class Carbon extends Elements {
  constructor(x, y, color, radius) {
    super(x, y, color, radius);
  }
}

function mousePressed(x, y, radius) {
  if (mouseX > x - radius && mouseX < x + radius && mouseY > y - radius && mouseY < y + radius) {
    x = mouseX;
    y = mouseY;
  }
}