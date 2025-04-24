// sketch.js - to generate a grid and fill it with tiles depending on style
// Author: Nhat Thai
// Date: 04/21/2025

// Baseic
let seed = 0;
let tilesetImage;
let currentGrid = [];
let numRows, numCols;
let currentStyle = "overworld"; // "dungeon" or "overworld"

function preload() {
  tilesetImage = loadImage("../img/tilesetP8.png");
}

function reseed() {
  seed = (seed | 0) + 1109;
  randomSeed(seed);
  noiseSeed(seed);
  select("#seedReport").html("seed " + seed);
  regenerateGrid();
}

function regenerateGrid() {
  if (currentStyle == "dungeon") {
  select("#asciiBox").value(gridToString(generateDungeonGrid(numCols, numRows)));
  } else if (currentStyle == "overworld") {
    select("#asciiBox").value(gridToString(generateOverworldGrid(numCols, numRows)));
  }
  reparseGrid();
}

function reparseGrid() {
  currentGrid = stringToGrid(select("#asciiBox").value());
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
  let grid = [];
  let lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let row = [];
    let chars = lines[i].split("");
    for (let j = 0; j < chars.length; j++) {
      row.push(chars[j]);
    }
    grid.push(row);
  }
  return grid;
}

function setup() {
  numCols = select("#asciiBox").attribute("rows") | 0;
  numRows = select("#asciiBox").attribute("cols") | 0;

  createCanvas(16 * numCols, 16 * numRows).parent("canvas-container");
  select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  select("#reseedButton").mousePressed(reseed);
  select("#asciiBox").input(reparseGrid);
  select("#switchButton").mousePressed(() => {
    seed = 1109;
    randomSeed(seed);
    noiseSeed(seed);
    select("#seedReport").html("seed " + seed);
    currentStyle = currentStyle === "dungeon" ? "overworld" : "dungeon";
    regenerateGrid();
  });

  reseed();
}

function draw() {
  randomSeed(seed);
  if (currentStyle === "dungeon") {
    drawDungeonGrid(currentGrid);
  } else if (currentStyle === "overworld") {
    drawOverworldGrid(currentGrid);
  }
}

function placeTile(i, j, ti, tj) {
  image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}
