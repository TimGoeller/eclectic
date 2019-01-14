var graph;
var vertex, vertex2;

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
  console.log(text);
  graph = Graph();
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
