// Final Project
// Liam Gareau
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let elements = [];
let pop;
const RECTWIDTH = 50;
const RECTHEIGHT = 10;
const AMOUNTOFCARBONBONDS = 4;
const AMOUNTOFHYDROGENBONDS = 1;
const BONDINGDISTANCE = 50;
const STRUCTUREDISTANCE = 75;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(220);
  instructions();

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
  constructor(x, y, color, radius, button, bondArray, arrayLength, bonded) {
    super(x, y, color, radius, button, bondArray, arrayLength, bonded);
  }
}

class Hydrogen extends Elements {
  constructor(x, y, color, radius, button, bondArray, arrayLength, bonded) {
    super(x, y, color, radius, button, bondArray, arrayLength, bonded);
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
      if (mouseX > element.x - element.radius && mouseX < element.x + element.radius && mouseY > element.y - element.radius && mouseY < element.y + element.radius) {
        for (let otherElement of element.bondArray) {
          otherElement.bondArray.splice(otherElement.bondArray.indexOf(element), 1);
          element.bondArray.splice(element.bondArray.indexOf(otherElement), 1);
          pop.play();
        }
      }
    }
  }
  else if (keyIsDown(77)) {
    for (let element of elements){
      if (element.x === mouseX) {
        dfs(element.bondArray);
      }
    }
  }
}

function dfs(adj) {
  const visited = new Array(adj.length).fill(false);
  const res = [];
  dfsRec(adj, visited, 0, res);
  return res;
}

function dfsRec(adj, visited, s, res) {
  visited[s] = true;
  res.push(s);

  for (let i of adj[s]) {
    if (!visited[i]) {
      dfsRec(adj, visited, i, res);
    }
  }
}

function preload() {
  pop = loadSound("pop-sound-Effect.mp3");
}

function instructions() {
  if (keyIsDown(73)) {
    textAlign(CENTER);
    noStroke();
    text("Make your own hydocarbons, Click and hold the following to summon their respective elements, C (carbon), H (hydrogen), ", width/2, height/2, 180);
  }
}

// function dfs(adj) {
//   const visited = new Array(adj.length).fill(false);
//   const res = [];
//   dfsRec(adj, visited, 0, res);
//   return res;
// }


// function dfsRec(adj, visited, s, res) {
//   visited[s] = true;
//   res.push(s);

//   // Recursively visit all adjacent vertices 
//   // that are not visited yet
//   for (let i of adj[s]) {
//     if (!visited[i]) {
//       dfsRec(adj, visited, i, res);
//     }
//   }
// }