const SIZE = 10;
var zoom = 1;

var translateVector;

var graph;
var vertex1, vertex2;

p5.disableFriendlyErrors = true;

var graphBuffer;

var swapBuffer1;
var swapBuffer2;
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

  swapBuffer1 = createGraphics(windowWidth, windowHeight);
  swapBuffer2 = createGraphics(windowWidth, windowHeight);

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
    //background(54, 55, 50);
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
  if (event.deltaY > 0) {
    zoom -= 0.03;
  } else {
    zoom += 0.03;
  }
  triggerRedraw();
  triggerRender();
}

async function triggerRender() {
  if (!renderingOngoing) {
    renderingOngoing = true;
    var currentBuffer;
    if (lastRenderedBuffer == 1) {
      currentBuffer = swapBuffer2;
      lastRenderedBuffer = 2;
    } else {
      currentBuffer = swapBuffer1;
      lastRenderedBuffer = 1;
    }
    currentBuffer.background(54, 55, 50);
    currentBuffer.translate(translateVector.x, translateVector.y);
    currentBuffer.scale(zoom);
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
  alert("A Star");
}

function exportToPNG() {
  alert("Save as PNG");
}

/* Event Initialization */

window.onload = function() {
  dropZone = document.getElementById("drop-zone");
  dijkstraButton = document.getElementById("dijkstra-button");
  astarButton = document.getElementById("dijkstra-button");
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

  astarButton.addEventListener("click", function(event) {
    exportToPNG();
  });
};
