function Graph() {
  this.vertices = [];
  this.edges = [];

  this.dijkstra = function() {
    let graph = this;
    let heap = new FibonacciHeap();
    this.getVertices().forEach(vertex => {
      vertex.setDistanceToStartVertex(Infinity);
      vertex.setPredecessor(null);
      heap.insert(0, vertex);
    });
    let startVertex = this.getVertex(0);
    startVertex.setHighlighted(true);
    startVertex.setDistanceToStartVertex(0);

    while (!heap.isEmpty()) {
      let u = heap.extractMinimum().value;
      console.log(u);
      console.log(u.getNeighbours());
      u.getNeighbours().forEach(v => {
        let edgeWeight = graph.retrieveEdgeByVertices(u, v).weight;
        if (v.distanceToStartVertex > u.distanceToStartVertex + edgeWeight) {
          heap.decreaseKey(v, u.distanceToStartVertex + edgeWeight);
          v.setDistanceToStartVertex(u.distanceToStartVertex + edgeWeight);
          v.setPredecessor(u);
        }
      });

      heap.extractMinimum;
    }
  };

  /* Vertices */

  this.addVertex = function(vertex) {
    this.vertices.push(vertex);
  };

  this.removeVertex = function(id) {
    this.vertices.splice(id, 1);
  };

  this.getVertex = function(id) {
    return this.vertices[id];
  };

  this.getVertices = function() {
    return this.vertices;
  };

  /* Edges */

  this.addEdge = function(edge) {
    this.edges.push(edge);
  };

  this.removeEdge = function(id) {
    this.edges.splice(id, 1);
  };

  this.getEdges = function() {
    return this.edges;
  };

  this.getEdge = function(id) {
    return this.edges[id];
  };

  this.retrieveEdgeByVertices = function(vertexA, vertexB) {
    console.log(vertexA.edges);
    for (var c = 0; c < vertexA.edges.length; c++) {
      if (
        vertexA.edges[c].vertexFrom == vertexB ||
        vertexA.edges[c].vertexTo == vertexB
      )
        return vertexA.edges[c];
    }
  };

  /* Requests */

  this.adjacent = function(vertexA, vertexB) {};

  this.neighbours = function(vertex) {};

  this.render = function(buffer) {
    //NO full rendering, when only one node is changed. TODO: Don't draw background, only draw that node (on top of the old one)
    this.edges.forEach(edge => {
      edge.render(buffer);
    });
    this.vertices.forEach(vertex => {
      vertex.render(buffer);
    });
  };
}

Graph.createGraphFromTxt = function(text) {
  let graph = new Graph();
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
      new Vertex(
        vertexInformation[1],
        vertexInformation[2],
        vertexInformation[0]
      )
    );
  });

  edges.forEach(function(edgeString) {
    let edgeInformation = edgeString.split(" ");
    let newEdge = new Edge(
      graph.getVertex(edgeInformation[1]),
      graph.getVertex(edgeInformation[2])
    );
    graph.addEdge(newEdge);
    graph.getVertex(edgeInformation[1]).addEdge(newEdge);
    graph.getVertex(edgeInformation[2]).addEdge(newEdge);
  });

  return graph;
};
