// Final Project
// Liam Gareau
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let elements = [];
const RECTWIDTH = 50;
const RECTHEIGHT = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(220);
  // spawnElements();

  for (let element of elements) {
    element.display();
    element.move();
    element.bonding();
  }
}

class Bond {
  constructor(x, y, color, button, width, height, bondArray) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.button = button;
    this.width = width;
    this.height = height;
    this.bondArray = bondArray;
  }

  display() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }

  move() {
    if (this.button) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }
}

class SingleBond extends Bond {
  constructor(x, y, color, button, width, height) {
    super(x, y, color, button, width, height);
  }
}

class Elements {
  constructor(x, y, color, radius, button, bondArray) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.button = button;
    this.bondArray = bondArray;
  }

  display() {
    fill(this.color);
    // noStroke();
    circle(this.x, this.y, this.radius*2);
  }

  move() {
    if (this.button) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  bonding() {
    for (let object of elements) {
      if (this.x !== object.x) {
        if (dist(this.x, this.y, object.x, object.y) < 50) {
          if (this.bondArray.length <= 3 && object.bondArray.length <= 3) {

          }
        }
      }
    }
  }
}

class Carbon extends Elements {
  constructor(x, y, color, radius, button, bondArray) {
    super(x, y, color, radius, button, bondArray);
  }
}

class Hydrogen extends Elements {
  constructor(x, y, color, radius, button, bondArray) {
    super(x, y, color, radius, button, bondArray);
  }
}

function mousePressed() {
  for (let element of elements) {
    if (mouseX > element.x - element.radius && mouseX < element.x + element.radius && mouseY > element.y - element.radius && mouseY < element.y + element.radius) {
      element.button = !element.button;
    }
    else if (mouseX > element.x - element.width/2 && mouseX < element.x + element.width/2 && mouseY > element.y - element.height/2 && mouseY < element.y + element.height/2) {
      element.button = !element.button;
    }
  }
}

function mouseClicked() {
  if (keyIsDown(67)) {
    let aCarbon = new Carbon(mouseX, mouseY, "black", 15, false, []);
    elements.push(aCarbon);
  }
  else if (keyIsDown(72)) {
    let aHydrogen = new Hydrogen(mouseX, mouseY, "white", 7.5, false, []);
    elements.push(aHydrogen);
  }
  else if (keyIsDown(66)) {
    let aBond = new Bond(mouseX, mouseY, "purple", false, RECTWIDTH, RECTHEIGHT, []);
    elements.push(aBond);
  }
}