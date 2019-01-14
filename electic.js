var graph;
var vertex1, vertex2;

function setup() {
  vertex1 = new Vertex( windowWidth/2, windowHeight/2, "2" );
  vertex2 = new Vertex( windowWidth/4, windowHeight/4, "1" );
  edge = new Edge( vertex1, vertex2, 2 );
  background(54, 55, 50);
  vertex1.show();
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(54, 55, 50);
  edge.show();
  vertex1.show();
  vertex2.show();
}

function createGraphFromTxt(text) {
  graph = new Graph();
  let informationBlocks = text.split(";");
  let dimensionInformation = informationBlocks[0].split(/\r?\n/);
  dimensionInformation.pop();
  let vertices = informationBlocks[1].split(/\r?\n/);
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
    graph.addVertex(
      vertexInformation[0],
      vertexInformation[1],
      vertexInformation[2]
    );
  });

  edges.forEach(function(edgeString) {
    let edgeInformation = edgeString.split(" ");
    graph.addVertex(
      edgeInformation[0], 
      edgeInformation[1], 
      edgeInformation[2]
    );
  });
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
