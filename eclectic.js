const SIZE = 40;
var zoom = 1;

var translateVector;

var graph;
var vertex1, vertex2;

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

function setup() {
  graph = new Graph();

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseWheel(mouseWheel);
  background(54, 55, 50);
  rectMode(CENTER);

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

  translate(translateVector.x, translateVector.y);
  scale(zoom);

  if (performRedrawNextFrame) {
    background(54, 55, 50);
    console.log("DrawGraph");
    graph.show();
    performRedrawNextFrame = false;
  }
}

function keyPressed() {
  addPressedWASDKeys();
}

function keyReleased() {
  removeReleasedWASDKeys();
}

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
}

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
