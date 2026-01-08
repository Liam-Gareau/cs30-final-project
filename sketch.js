// Final Project
// Liam Gareau
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let elements = [];
let pop;
let name = "Awaiting name...";
let prefix = ["meth", "eth", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec"];
let check = false;
const RECTWIDTH = 50;
const RECTHEIGHT = 10;
const AMOUNTOFCARBONBONDS = 4;
const AMOUNTOFHYDROGENBONDS = 1;
const BONDINGDISTANCE = 50;
const STRUCTUREDISTANCE = 75;
const HYDROGENRADIUS = 7.5;
const CARBONRADIUS = 15;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(220);
  instructions();
  naming();
  nameChecker();
  text(name, width/2, height/6);

  if (!keyIsDown(73)) {
    for (let element of elements) {
      element.update();
    }
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
    let aCarbon = new Carbon(mouseX, mouseY, "black", CARBONRADIUS, false, [], AMOUNTOFCARBONBONDS, false);
    elements.push(aCarbon);
  }
  else if (keyIsDown(72)) {
    let aHydrogen = new Hydrogen(mouseX, mouseY, "white", HYDROGENRADIUS, false, [], AMOUNTOFHYDROGENBONDS, false);
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
  else if (keyIsDown(68)) {
    for (let element of elements) {
      if (mouseX > element.x - element.radius && mouseX < element.x + element.radius && mouseY > element.y - element.radius && mouseY < element.y + element.radius) {
        elements.splice(elements.indexOf(element), 1);
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

let s = 0;

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
  textAlign(CENTER);
  noStroke();
  textSize(15);
  text("Hold I for instructions", 100, 100);
  if (keyIsDown(73)) {
    noStroke();
    fill("black");
    textSize(25);
    text("Make your own hydocarbons, Click and hold the followin  g to summon their respective elements, C (carbon), H (hydrogen), Drag the atoms closer together to form bonds, Click and hold r over the atoms to remove its bonds, Once satisfied with the length of your chain press n to name the chain, for any carbons not bonded press and hold d in order to delete them as to not interfere with the auto grading of your name. ", width/2, height/2, width/2);
  }
}

function naming() {
  if (keyIsDown(78)) {
    name = prompt("What is the name of this chain of atoms?");
    if (name === "" || name === null) {
      name = "Awaiting name...";
    }
    else {
      fill("black");
      text(nameChecker(), 200, 300);
      // console.log("work");
    }
  }
}

function carbonsOnScreen() {
  let counter = 0;
  for (let thing of elements) {
    if (thing.color === "black") {
      counter++;
    }
  }
  return counter;
}

function nameChecker() {
  if (!check) {
    for (let pre of prefix) {
      if (name === pre + "ane") {
        check = true;
      }
    }
  }
  else if (check) {
    let trueOrFalse = "";
    for (let pre of prefix) {
      if (prefix[carbonsOnScreen()-1] === pre) {
        console.log("here");
        return trueOrFalse = "Correct name";
      }
      else {
        console.log("also here");
        return trueOrFalse = "Wrong name";
      }
    }
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