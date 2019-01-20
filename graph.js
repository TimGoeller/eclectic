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

  this.heuristicFor = function(startVertex) {
    beeline = [];
    this.vertices.forEach(function(vertex) {
      beeline.push(vertex.getBeelineTo(startVertex))
    })
    return beeline
  }

  /*
  this.astar = function() {
    var startVertex = this.vertices[Math.floor(Math.random() * this.vertices.length)]; 
    var heuristic = this.heuristicFor(startVertex)
    var destinationVertex = this.vertices[Math.floor(Math.random() * this.vertices.length)]; 

    var openList = new FibonacciHeap();
    var closedList = [];

    startVertex.distanceToStartVertex = 0;

    openList.insert(startVertex.distanceToStartVertex, startVertex);

    while(!openList.isEmpty()) {
      var u = openList.extractMinimum().value
      if(u == destinationVertex) {
        //GEFUNDEN! YAY
        console.log(closedList);
        console.log(openList);
      }
      closedList.push(u);
      this.expandNode(closedList, openList, u, heuristic)
    }
  }

  this.expandNode = function(closedList, openList, u, heuristic) {

    var context = this;

    u.getNeighbours().forEach(function(neighbour) {
      if(closedList.includes(neighbour)) {
        return;
      }
      var g = u.distanceToStartVertex + context.retrieveEdgeByVertices(u, neighbour).weight
      if(openList.contains(neighbour) && g >= neighbour.distanceToStartVertex) {
        return;
      }
      neighbour.setPredecessor(u);
      neighbour.setDistanceToStartVertex(g);
      var f = g + heuristic[context.vertices.indexOf(neighbour)];
      if(openList.contains(neighbour)) {
        console.log("Dec Key")
        console.log(f)
        console.log(openList.findByValue(neighbour).key)
        openList.decreaseKey(openList.findByValue(neighbour), f)
      }
      else {
        console.log("Insert")
        console.log(f)
        openList.insert(f,neighbour)
      }

    })
  }*/

  this.astar =  function() {
    var startVertex = this.vertices[3086]; 
    var heuristic = this.heuristicFor(startVertex)
    console.log(heuristic)
    var destinationVertex = this.vertices[3206]; 

    var openList = new FibonacciHeap();
    var closedList = [];

    startVertex.distanceToStartVertex = 0;

    openList.insert(0, startVertex);

    while(!openList.isEmpty()) { 
      var currentNode = openList.extractMinimum().value
      console.log(currentNode)

      currentNode.setHighlighted(true)
      

      /*let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 100)
      });
    
      let result = await promise; */
      
      triggerRender()
      
      if(currentNode == destinationVertex) {
        console.log("GEFUNDEN")
        console.log(openList);
        console.log(closedList)
        return;
      }

      //console.log(openList.minNode)

      closedList.push(currentNode)
      this.expandNode(currentNode, closedList, openList, heuristic)
      
    }
    
    
  }

  this.expandNode = function(currentNode, closedList, openList, heuristic) {

    var context = this;

    currentNode.getNeighbours().forEach(neighbour => {
      if(closedList.includes(neighbour)) {
        return
      }

      var tentative_g = currentNode.distanceToStartVertex + context.retrieveEdgeByVertices(currentNode, neighbour).weight
      
      if(openList.contains(neighbour) && tentative_g >= neighbour.distanceToStartVertex) {
        return
      }

      console.log("TEST")

      neighbour.setPredecessor(currentNode)
      neighbour.setDistanceToStartVertex(tentative_g)
      //neighbour.value = tentative_g

      var f = tentative_g + heuristic[context.vertices.indexOf(neighbour)];
      
      if(openList.contains(neighbour)) {
        // BRY:
        console.log(openList.findByValue(neighbour).value)
        console.log(f)

        openList.decreaseKey(openList.findByValue(neighbour), f)
      }
      else {
        openList.insert(f,neighbour)
      }
    });
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
