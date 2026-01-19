// Final Project
// Liam Gareau
// Date January 19th 2026

//defining all of my variables
let elements = [];
let chain = [];
let pop;
let name = "Awaiting name...";
let prefix = ["meth", "eth", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec"];
let check = false;
let trueOrFalse = "";
let additionX;
let additionY;
let items = [
  "Hold one of the following keys and left click to interect with atoms",
  "C - Spawn Carbon",
  "H - Spawn Hydrogen",
  "M - Move Chain",
  "R - Remove Bonds",
  "D - Delete Atom",
  "M + scroll wheel - rotate chain",
  "I - Further Instructions"
];
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
}

function draw() {
  background(220);
  updateAll();
}

//base code for all my different elements
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

  //displays each element
  display() {
    fill(this.color);
    noStroke();
    circle(this.x, this.y, this.radius*2);
  }

  //moves them with mouse
  move() {
    if (!this.bonded) {
      if (this.button) {
        this.x = mouseX;
        this.y = mouseY;
      }
    }
  }

  //checks distance between elements in order to bond them
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

  //draws the line acting as the bond
  bonding() {
    for (let object of this.bondArray) { 
      stroke("purple");
      line(this.x, this.y, object.x, object.y);
    }
  }

  //runs all the functions for the object
  update() {
    this.display();
    this.move();
    this.distance();
    this.bonding();
  }
}

//sub class for the carbons
class Carbon extends Elements {
  constructor(x, y, color, radius, button, bondArray, arrayLength, bonded) {
    super(x, y, color, radius, button, bondArray, arrayLength, bonded);
  }
}

//sub class for the hydrogens
class Hydrogen extends Elements {
  constructor(x, y, color, radius, button, bondArray, arrayLength, bonded) {
    super(x, y, color, radius, button, bondArray, arrayLength, bonded);
  }
}

//chooses the element to move when it is clicked
function mousePressed() {
  if (!keyIsDown(77)) {
    for (let element of elements) {
      if (mouseX > element.x - element.radius && mouseX < element.x + element.radius && mouseY > element.y - element.radius && mouseY < element.y + element.radius) {
        element.button = !element.button;
      }
    }
  }
}

//spawning, deleting, reseting all my different elements
function mouseClicked() {
  //when holding C and left clicking creates a carbon atom
  if (keyIsDown(67)) {
    let aCarbon = new Carbon(mouseX, mouseY, "black", CARBONRADIUS, false, [], AMOUNTOFCARBONBONDS, false);
    elements.push(aCarbon);
  }
  //when holding H and left clicking creates a hydrogen atom
  else if (keyIsDown(72)) {
    let aHydrogen = new Hydrogen(mouseX, mouseY, "white", HYDROGENRADIUS, false, [], AMOUNTOFHYDROGENBONDS, false);
    elements.push(aHydrogen);
  }
  //when holding r and left clicking removes bonds of selected atom
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
  //when holding r and left clicking over an atom it deletes it
  else if (keyIsDown(68)) {
    for (let element of elements) {
      if (mouseX > element.x - element.radius && mouseX < element.x + element.radius && mouseY > element.y - element.radius && mouseY < element.y + element.radius) {
        elements.splice(elements.indexOf(element), 1);
        chain.splice(chain.indexOf(element), 1);
      }
    }
  }
  //when holding m and left clicking over an atom it will add what its bonded to into an array to move the whole thing
  else if (keyIsDown(77)) {
    chain = [];
    for (let element of elements){
      if (mouseX > element.x - element.radius && mouseX < element.x + element.radius && mouseY > element.y - element.radius && mouseY < element.y + element.radius) {
        detectChain(element);
      }
    }
  }
}

//takes in the current mx and my postion aswell as the past mx and my positions in order to know how much to move each object apart of the chain
function moveChain(currentMX, previousMX, currentMY, previousMY) {
  if (keyIsDown(77)) {
    additionX = currentMX - previousMX;
    additionY = currentMY - previousMY;
  }
  else {
    additionX = 0;
    additionY = 0;
  }
}

//simplifys my draw loop
function updateAll() {
  instructions();
  naming();
  nameChecker();
  moveChain(mouseX, pmouseX, mouseY, pmouseY);
  text(name, width/2, height/6);
  if (keyIsDown(77)) {
    for (let thing of chain) {
        thing.x += additionX;
        thing.y += additionY;
      }
  }
  if (!keyIsDown(73)) {
    for (let element of elements) {
      element.update();
    }
  }
}

//tells people how the game works
function instructions() {
  noStroke();
  textSize(16);
  fill(0);
  textAlign(LEFT);
  for (let i = 0; i < items.length; i++) {
    text(items[i], 50, 50 + i * 25);
  }

  if (keyIsDown(73)) {
    textAlign(CENTER);
    text("Begin by placing carbons down and dragging them close together in order to form bonds between them. Once satisfied with the length place hydrogens around each carbon to fill its valence shell. When chain is satisfied click N and attempt to name the hydrocarbon, if correct game will tell you.", width/2, height/2, width/2);
  }
}

//sets the name of the chain
function naming() {
  if (keyIsDown(78)) {
    name = prompt("What is the name of this chain of atoms?");
    if (name === "" || name === null) {
      name = "Awaiting name...";
    }
  }
  else {
    fill("black");
    textSize(15);
    textAlign(CENTER);
    text(trueOrFalse, 200, 300);
  }
}

//checks the carbons on screen
function carbonsOnScreen() {
  let counter = 0;
  for (let thing of elements) {
    if (thing.color === "black") {
      counter++;
    }
  }
  return counter;
}


//checks to see if the name is right
function nameChecker() {
  if (!check) {
    for (let pre of prefix) {
      if (name === pre + "ane") {
        check = true;
      }
    }
  }
  else if (check) {
    if (prefix[carbonsOnScreen()-1] + "ane" === name) {
      return trueOrFalse = "Correct name";
    }
    return trueOrFalse = "Wrong name";
  }
}

//loads sound
function preload() {
  pop = loadSound("pop-sound-Effect.mp3");
}

//checks for everything that the selected atom is bonded to
function detectChain(element) {
  if (!chain.includes(element)) {
    chain.push(element);
    let search = element.bondArray.length;
    for (let i = 0; i < search; i++) {
      nextElement = element.bondArray[i];
      detectChain(nextElement);
    }
  }
}

//figures out where the center of the chain is to rotate around that point
function getChainCenter() {
 let sumX = 0;
 let sumY = 0;

 for (let atom of chain) {
  sumX += atom.x;
  sumY += atom.y;
 }
 return {
  x: sumX / chain.length,
  y: sumY / chain.length
 };
}

//rotates the chain when holding m and scrolling the scroll wheel
function rotateChain(angle) {
  if (chain.length === 0) {
    return;
  }

  let center = getChainCenter();

  for (let atom of chain) {
    let dx = atom.x - center.x;
    let dy = atom.y - center.y;

    //trajectories for the rotation of each atom in the chain
    let newX = dx * cos(angle) - dy * sin(angle);
    let newY = dx * sin(angle) + dy * cos(angle);

    atom.x = center.x + newX;
    atom.y = center.y + newY;
  }
}

//detects the rotation of the scroll wheel
function mouseWheel(event) {
  if (keyIsDown(77) && chain.length > 0) {
    let angle = event.delta * 0.001;
    rotateChain(angle);
  }
}