function Graph() {
  this.vertices = [];
  this.edges = [];

  this.showShortestPath = function( goalVertex ){
    let currentVertex = goalVertex;
    currentVertex.setPathHighlighted(true);
    do {     
      this.retrieveEdgeByVertices( currentVertex, currentVertex.predecessor ).setPathHighlighted( true );
      currentVertex = currentVertex.predecessor;
      currentVertex.setPathHighlighted(true);
    } while (currentVertex.predecessor != null);
    
    triggerRender();
  }

  this.dijkstra = async function() {
    console.log( "Dijkstra algorithm started." )
    let graph = this;
    let startVertex = this.getVertex(6);
    let destinationVertex = this.getVertex(0);
    startVertex.setHighlighted(true);
    startVertex.setDistanceToStartVertex(0);
    //triggerRender();

    let heap = new FibonacciHeap();
    this.getVertices().forEach(vertex => {
      if (vertex != startVertex) {
        vertex.setDistanceToStartVertex(Infinity);
        vertex.setPredecessor(null);
      }
      heap.insert(vertex.distanceToStartVertex, vertex);
    });

    while (!heap.isEmpty()) {
      let u = heap.extractMinimum().value;
      if( u == destinationVertex ){
        this.showShortestPath(destinationVertex);
        return;
      }
    
      u.setHighlighted(true);
      /*triggerRender();
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1)
      });
      await promise;*/

      u.getNeighbours().forEach(function(v) {  
        if(heap.contains(v)) {
          let edgeWeight = graph.retrieveEdgeByVertices(u, v).weight;
          graph.retrieveEdgeByVertices(u, v).setHighlighted(true);
          //v.setHighlighted(true);
          //triggerRender();
          if (v.distanceToStartVertex > u.distanceToStartVertex + edgeWeight) {
              v.setPredecessor(u);
              v.setDistanceToStartVertex( parseFloat(u.distanceToStartVertex + edgeWeight) );
              //triggerRender();
              heap.decreaseKey(heap.findByValue(v), parseFloat(u.distanceToStartVertex + edgeWeight));
          }
        }
      });
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

  this.astar = function() {
    var startVertex = Math.floor(Math.random() * this.vertices.length);
    var destinationVertex = Math.floor(Math.random() * this.vertices.length);

    var openlist = new FibonacciHeap();
    var closedList = [];

    startVertex.distanceToStartVertex = 0;

    openlist.insert(0, startVertex);

    while (!openlist.isEmpty()) {
      var u = openlist.extractMinimum();
      if (u == destinationVertex) {
        //GEFUNDEN! YAY
      }
      closedList.add(u);
    }
  };

  this.expandNode = function(closedList, openList, u) {
    u.getNeighbours().forEach(function(neighbour) {
      if (closedList.contains(neighbour)) {
        return;
      }
      //var g = u.distanceToStartVertex + u.
    });
  };
  //
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
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
