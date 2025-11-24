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

class Bond {
  constructor(x, y, color, button, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.button = button;
    this.width = width;
    this.height = height;
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
  constructor(x, y, color, radius, button) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.button = button;
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

  bond(x, y) {
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
    else if (mouseX > element.x - element.width && mouseX < element.x + element.width && mouseY > element.y - element.height && mouseY < element.y + element.height) {
      console.log(element.button);
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
  else if (keyIsDown(66) && mouseIsPressed) {
    let aBond = new Bond(mouseX, mouseY, "purple", false, RECTWIDTH, RECTHEIGHT);
    elements.push(aBond);
  }
}

// function spawnBond() {
//   for (let element of elements) {
//     if (dist(element))
//   }
// }