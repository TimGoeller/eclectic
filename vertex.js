function Vertex(x = 0, y = 0, value = "") {
  this.position = createVector(x, y);

  // Properties only relevant for algorithms
  this.distanceToStartVertex = Infinity;
  this.predecessor = null;
  this.value = value;

  this.highlighted = false;
  this.setHighlighted = function(isHighlighted) {
    this.highlighted = isHighlighted;
  };

  this.edges = [];

  this.getBeelineTo = function(vertex) {
    return Math.round(
      Math.sqrt(Math.pow(parseFloat(this.position.x) - parseFloat(vertex.position.x), 2) + Math.pow(parseFloat(this.position.y) - parseFloat(vertex.position.y),2)));
  }

  this.addEdge = function(edge) {
    this.edges.push(edge);
  };

  this.getNeighbours = function() {

    var neighbours = [];
    var context = this;

    this.edges.forEach(function(edge) {
      
      if(edge.vertexFrom == context) {       
        neighbours.push(edge.vertexTo)
      }
      else {
        neighbours.push(edge.vertexFrom)
      }
      
    })
    return neighbours;
  }

  this.render = function(buffer) {
    buffer.stroke(83, 216, 251);
    if (this.highlighted) buffer.stroke("#E83562");
    buffer.fill("#DCE1E9");
    if (this.highlighted) buffer.fill("#E83562");

    buffer.strokeWeight(SIZE / 10);
    buffer.ellipse(this.position.x, this.position.y, SIZE);

    /* Text with value */
    buffer.fill("#1C3646");
    if (this.highlighted) buffer.fill("#FFFFFF");
    buffer.strokeWeight(0);
    buffer.textSize(SIZE / 2);
    buffer.textAlign(CENTER, CENTER);
    buffer.text(
      this.value,
      this.position.x,
      parseFloat(this.position.y) + SIZE / 20
    );
  };

  this.setDistanceToStartVertex = function(distance) {
    this.distanceToStartVertex = distance;
  };

  this.setPredecessor = function(predecessor) {
    this.predecessor = predecessor;
  };
}
