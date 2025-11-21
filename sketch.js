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
  spawnElements();

  for (let element of elements) {
    element.display();
    element.move();
  }
}

class Bonds {
  constructor(x1, y1, x2, y2, color, button) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.button = button;
  }
}

class SingleBond extends Bonds {
  constructor(x1, y1, x2, y2, color, button) {
    super(x1, y1, x2, y2, color, button);
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
    if (this.button) {
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

class Hydrogen extends Elements {
  constructor(x, y, color, radius, button) {
    super(x, y, color, radius, button);
  }
}

function mousePressed() {
  for (let element of elements) {
    if (mouseX > element.x - element.radius && mouseX < element.x + element.radius && mouseY > element.y - element.radius && mouseY < element.y + element.radius) {
      element.button = !element.button;
    }
  }
}

function spawnElements() {
  if (keyIsDown(67) && mouseIsPressed) {
    let aCarbon = new Carbon(mouseX, mouseY, "black", 15, false);
    elements.push(aCarbon);
  }
  else if (keyIsDown(72) && mouseIsPressed) {
    let aHydrogen = new Hydrogen(mouseX, mouseY, "white", 7.5, false);
    elements.push(aHydrogen);
  }
}