// Final Project
// Liam Gareau
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let elements = [];
const RECTWIDTH = 50;
const RECTHEIGHT = 10;
const AMOUNTOFCARBONBONDS = 4;
const AMOUNTOFHYDROGENBONDS = 1;
const BONDINGDISTANCE = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(220);
  // spawnElements();

  for (let element of elements) {
    element.update();
  }
}

class Elements {
  constructor(x, y, color, radius, button, bondArray, arrayLength, bonded) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.button = button;
    this.bondArray = bondArray;
    this.arrayLength = arrayLength;
    this.bonded = bonded;
  }

  display() {
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  move() {
    if (!this.bonded) {
      if (this.button) {
        this.x = mouseX;
        this.y = mouseY;
      }
    }
    if (this.bonded) {
    }
  }

  distance() {
    for (let object of elements) {
      if (this !== object) {
        if (dist(this.x, this.y, object.x, object.y) < BONDINGDISTANCE) {
          if (this.bondArray.length < this.arrayLength && object.bondArray.length < object.arrayLength && !this.bondArray.includes(object) && !object.bondArray.includes(this)) {
            this.bondArray.push(object);
            object.bondArray.push(this);
          }
        }
      }
    }
  }

  bonding() {
    for (let object of this.bondArray) { 
      stroke("purple");
      line(this.x, this.y, object.x, object.y);
    }
  }

  update() {
    this.display();
    this.move();
    this.distance();
    this.bonding();
  }
}

class Carbon extends Elements {
  constructor(x, y, color, radius, button, bondArray, arrayLength) {
    super(x, y, color, radius, button, bondArray, arrayLength);
  }
}

class Hydrogen extends Elements {
  constructor(x, y, color, radius, button, bondArray, arrayLength) {
    super(x, y, color, radius, button, bondArray, arrayLength);
  }
}

function mousePressed() {
  for (let element of elements) {
    if (mouseX > element.x - element.radius && mouseX < element.x + element.radius && mouseY > element.y - element.radius && mouseY < element.y + element.radius) {
      element.button = !element.button;
    }
  }
}

function mouseClicked() {
  if (keyIsDown(67)) {
    let aCarbon = new Carbon(mouseX, mouseY, "black", 15, false, [], AMOUNTOFCARBONBONDS, false);
    elements.push(aCarbon);
  }
  else if (keyIsDown(72)) {
    let aHydrogen = new Hydrogen(mouseX, mouseY, "white", 7.5, false, [], AMOUNTOFHYDROGENBONDS, false);
    elements.push(aHydrogen);
  }
  else if (keyIsDown(82)) {
    for (let element of elements) {
      if (mouseX > element.x - element.radius && mouseX < element.x + element.radius && mouseY > element.y - element.radius && mouseY < element.y + element.radius && mouseIsPressed) {
        for (let otherElement of element.bondArray) {
          otherElement.bondArray.pop(element);
          element.bondArray.pop(otherElement);
        }
      }
    }
  }
}