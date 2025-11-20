// Final Project
// Liam Gareau
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let elements = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  let aCarbon = new Carbon(width/2, height/2, "black", 15, false);
  elements.push(aCarbon);
}

function draw() {
  background(220);

  for (let element of elements) {
    element.display();
    element.move();
    mousePressed(element.x, element.y, element.radius, element.button);
  }
}

class Elements {
  constructor(x, y, color, radius, button) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.button = button;
  }

  display() {
    fill(this.color);
    noStroke();
    circle(this.x, this.y, this.radius*2);
  }

  move() {
    if (this.button === true) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }
}

class Carbon extends Elements {
  constructor(x, y, color, radius, button) {
    super(x, y, color, radius, button);
  }
}

function mousePressed(x, y, radius, button) {
  if (mouseX > x - radius && mouseX < x + radius && mouseY > y - radius && mouseY < y + radius) {
    button = !button;
  }
}