function Graph() {
  this.vertices = [];
  this.edges = [];

  /* Vertices */

  this.addVertex = function(id, x, y) {
    // BRY: Ich schlage vor, die Id zu ignorieren und mit den Objekten zu arbeiten.
    this.vertices[id] = new Vertex(x, y);
  };

  this.removeVertex = function(id) {};

  this.getVertex = function(id) {};

  this.getVertices = function() {};

  /* Edges */

  this.addEdge = function(id, fromID, toID) {};

  this.removeEdge = function() {};

  this.getEdges = function() {};

  this.getEdge = function(id) {};

  this.retrieveEdgeByVertices = function(vertexA, vertexB) {};

  /* Requests */

  this.adjacent = function(vertexA, vertexB) {};

  this.neighbours = function(vertex) {};
}
