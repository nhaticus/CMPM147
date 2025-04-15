// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Globals
let canvasContainer;
let seed = 147;
let clouds = [];
let numClouds = 100;
let numFlowers;

// colors
const skyColor = "#57b4d6";
const grassColor = "#40793c";
const petalColor = "#f4a300";
const petalOutline = "#b77c00";
const leafColor = "#4b8c2a";
const leafOutline = "#2b4e1a"
const coreColor = "#2a180f";

$('#reimagine').click(function() {
  seed++;
});

function resizeScreen() {
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
}

function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  $(window).resize(function() {
    resizeScreen();
  });
  
  for (let i = 0; i < numClouds; i++) {
    clouds.push(new Cloud(random(width), random(0, height / 2), random(1, 2)));
  }
}

function draw() {
  clear();
  randomSeed(seed);
  numFlowers = int(random(200, 300));
  noStroke();
  
  drawBackground();

  // moving clouds
  for (let cloud of clouds) {
    cloud.move();
    cloud.display();
  }

  // flowers
  for (let i  = 0; i < numFlowers; i++){
		drawFlower(random(width), random(3 * height / 8, 7 * height / 8), random(10, 20), 16);
	}
}

function drawBackground() {
  noStroke();
  fill(skyColor);
  rect(0, 0, width, height / 2);
  
  fill(grassColor);
  rect(0, height / 2, width, height);
}

function drawFlower(x, y, size, petals) {
  
  var ranGreen = random(128, 200);
  // stem
  stroke(0, ranGreen, 0);
  strokeWeight(size / 2);
  line(x, y, x, height);
  noStroke();
  
  strokeWeight(0.5);
  
  // leaves
  stroke(leafOutline);
  fill(leafColor);
  ellipseMode(CORNER);
  var numLeaves = (height - y) / 200;
  for (let i = 0; i < numLeaves ; i++) {
    var leaveWidth = size * 3;
    var ranHeight = random(y, height);
    var heightOffset = random(-10, 10);
    ellipse(x, ranHeight, leaveWidth, size);
    ellipse(x - leaveWidth, ranHeight - heightOffset, leaveWidth, size);
  }
  ellipseMode(CENTER);
  
  // petals
  stroke(petalOutline);
  fill(petalColor);
  for (let i = 0; i < petals ; i++) {
    let angle = TWO_PI * i / petals;
    push();
    translate(x, y);
    rotate(angle);
    ellipse(0, size, size, size * 4);
    pop();
  }

  // center/core/disc (not sure what it is called)
  fill(coreColor);
  circle(x, y, size * 2);
}

class Cloud {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.offset = random(1000); 
  }

  move() {
    this.x += this.speed;
    this.y += map(noise(this.offset), 0, 1, -0.5, 0.5);
    this.offset += 0.01;

    // move back to the left side
    if (this.x > width) {
      this.x = -75; // just a little bit off the screen
    }
  }

  display() {
    noStroke();
    fill(255, 255, 255, 200); 

    // emulating clouds using ellipses
    ellipse(this.x, this.y, 60, 30);
    ellipse(this.x + 15, this.y + 10, 60, 30);
    ellipse(this.x - 15, this.y + 10, 60, 30);
  }
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}