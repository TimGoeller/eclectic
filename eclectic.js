const SIZE = 10;
var zoom = 1;

var translateVector;

var graph;
var vertex1, vertex2;

p5.disableFriendlyErrors = true;

var graphBuffer;

var swapBuffer1;
var last1Zoom = 0;
var swapBuffer2;
var last2Zoom = 0;
var lastRenderedBuffer = 1;
var renderingOngoing = false;

// WASD-Controls
var wasdCurrentlyPressed = [];
const wasdMovementSpeed = 5;
const wasdTranslations = {
  w: ["y", wasdMovementSpeed],
  a: ["x", wasdMovementSpeed],
  s: ["y", -wasdMovementSpeed],
  d: ["x", -wasdMovementSpeed]
};

var performRedrawNextFrame = false;

/* P5.js functions */

function setup() {
  graph = new Graph();

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseWheel(mouseWheel);
  background(54, 55, 50);
  rectMode(CENTER);

  //Dimension multiplication required for zooming, so Out-Of-Window context is drawn too
  swapBuffer1 = createGraphics(windowWidth * 5, windowHeight * 5);
  swapBuffer2 = createGraphics(windowWidth * 5, windowHeight * 5);

  translateVector = createVector(-0.1, -0.1);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(54, 55, 50);
}

function draw() {
  wasdCurrentlyPressed.forEach(function(pressedKey) {
    let pressedKeyTranslation = wasdTranslations[pressedKey];
    translateVector[pressedKeyTranslation[0]] +=
      pressedKeyTranslation[1] * (100 / frameRate());
    triggerRedraw();
  });

  if (performRedrawNextFrame) {
    background(54, 55, 50);
    translate(translateVector.x, translateVector.y);
    if (lastRenderedBuffer == 1) {
      image(swapBuffer1, 0, 0);
    } else {
      image(swapBuffer2, 0, 0);
    }

    performRedrawNextFrame = false;
  }
}

function keyPressed() {
  addPressedWASDKeys();
}

function keyReleased() {
  removeReleasedWASDKeys();
}

/* Custom functions */

function addPressedWASDKeys() {
  if (key == "w") wasdCurrentlyPressed.push("w");
  if (key == "a") wasdCurrentlyPressed.push("a");
  if (key == "s") wasdCurrentlyPressed.push("s");
  if (key == "d") wasdCurrentlyPressed.push("d");
}

function removeReleasedWASDKeys() {
  if (key == "w")
    wasdCurrentlyPressed.splice(wasdCurrentlyPressed.indexOf("w"), 1);
  if (key == "a")
    wasdCurrentlyPressed.splice(wasdCurrentlyPressed.indexOf("a"), 1);
  if (key == "s")
    wasdCurrentlyPressed.splice(wasdCurrentlyPressed.indexOf("s"), 1);
  if (key == "d")
    wasdCurrentlyPressed.splice(wasdCurrentlyPressed.indexOf("d"), 1);
}

function triggerRedraw() {
  performRedrawNextFrame = true;
}

function mouseWheel(event) {
  //TODO: Limit zooming, improve performance (Don't rerender every time. Maybe first translate image only, then rerender in the background?)
  if (event.deltaY > 0) {
    zoom -= 0.06;
  } else {
    zoom += 0.06;
  }
  triggerRedraw();
  triggerRender();
}

async function triggerRender() {
  if (!renderingOngoing) {
    renderingOngoing = true;
    var currentBuffer;
    var lastTranslation;
    if (lastRenderedBuffer == 1) {
      currentBuffer = swapBuffer2;
      currentBuffer.scale(1 / last2Zoom);
      last2Zoom = zoom;
      currentBuffer.scale(zoom);
      lastRenderedBuffer = 2;
    } else {
      currentBuffer = swapBuffer1;
      currentBuffer.scale(1 / last1Zoom);
      last1Zoom = zoom;
      currentBuffer.scale(zoom);
      lastRenderedBuffer = 1;
    }

    currentBuffer.background(54, 55, 50);

    if (graph) {
      graph.render(currentBuffer);
    }
    triggerRedraw();
    renderingOngoing = false;
  }
}

function triggerRenderForBuffer(buffer) {}

function startDijkstraAlgorithmOnCurrentGraph() {
  alert("Dijkstra!");
}

function startAStarAlgorithmOnCurrentGraph() {
  graph.astar();
}

function exportToPNG() {
  alert("Save as PNG");
}

/* Event Initialization */

window.onload = function() {
  dropZone = document.getElementById("drop-zone");
  dijkstraButton = document.getElementById("dijkstra-button");
  astarButton = document.getElementById("astar-button");
  exportButton = document.getElementById("export-button");

  dropZone.addEventListener("dragover", function(event) {
    event.preventDefault();
  });

  dropZone.addEventListener("drop", function(event) {
    event.preventDefault();

    let file = event.dataTransfer.files[0],
      reader = new FileReader();

    if (file.type == "text/plain") {
      reader.readAsText(file);
      reader.onloadend = function(e) {
        graph = Graph.createGraphFromTxt(reader.result);
        triggerRender();
        triggerRedraw();
      };
    }
  });

  dijkstraButton.addEventListener("click", function(event) {
    startDijkstraAlgorithmOnCurrentGraph();
  });

  astarButton.addEventListener("click", function(event) {
    startAStarAlgorithmOnCurrentGraph();
  });

  exportButton.addEventListener("click", function(event) {
    exportToPNG();
  });
};
