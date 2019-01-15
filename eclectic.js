const SIZE = 40;
var zoom = 1;

var translateVector;

var graph;
var vertex1, vertex2;

var wasdDown = [false, false, false, false];

function setup() {
  graph = new Graph();

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseWheel(mouseWheel);
  background(54, 55, 50);
  rectMode(CENTER);

  translateVector = createVector(0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(54, 55, 50);
  graph.show();
}

function draw() {
  background(54, 55, 50);

  if (wasdDown[0]) {
    translateVector.y += 5;
  }
  if (wasdDown[1]) {
    translateVector.x += 5;
  }
  if (wasdDown[2]) {
    translateVector.y -= 5;
  }
  if (wasdDown[3]) {
    translateVector.x -= 5;
  }
  //console.log(translateVector);
  translate(translateVector.x, translateVector.y);
  scale(zoom);
  edge.show();
  vertex1.show();
  vertex2.show();
}

function keyPressed() {
  if (key == "w") wasdDown[0] = true;
  if (key == "a") wasdDown[1] = true;
  if (key == "s") wasdDown[2] = true;
  if (key == "d") wasdDown[3] = true;
}

function keyReleased() {
  if (key == "w") wasdDown[0] = false;
  if (key == "a") wasdDown[1] = false;
  if (key == "s") wasdDown[2] = false;
  if (key == "d") wasdDown[3] = false;
}

function mouseWheel(event) {
  if (event.deltaY > 0) {
    zoom -= 0.03;
  } else {
    zoom += 0.03;
  }
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

function createGraphFromTxt(text) {
  graph = new Graph();
  let informationBlocks = text.split(";");
  let dimensionInformation = informationBlocks[0].split(/\r?\n/);
  dimensionInformation.pop();
  let vertices = informationBlocks[1].split(/\r?\n/);
  // BRY: Ich würde pop() und shift() mit slice() ersetzen
  vertices.pop();
  vertices.shift();
  let edges = informationBlocks[2].split(/\r?\n/);
  edges.pop();
  edges.shift();

  graphDimensions = createVector(
    dimensionInformation[0],
    dimensionInformation[1]
  );

  vertices.forEach(function(vertexString) {
    let vertexInformation = vertexString.split(" ");
    graph.addVertex(new Vertex(vertexInformation[1], vertexInformation[2]));
  });

  edges.forEach(function(edgeString) {
    let edgeInformation = edgeString.split(" ");
    graph.addEdge(
      new Edge(
        graph.getVertex(edgeInformation[1]),
        graph.getVertex(edgeInformation[2])
      )
    );
  });
  graph.show();
}

window.onload = function() {
  dropZone = document.getElementById("drop-zone");

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
        createGraphFromTxt(reader.result);
      };
    }
  });
};
