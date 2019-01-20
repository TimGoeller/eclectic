function Edge(vertexFrom, vertexTo) {
  this.highlighted = false;

  this.setHighlighted = function(isHighlighted) {
    this.highlighted = isHighlighted;
  };

  this.pathHighlighted = false;
  this.setPathHighlighted = function(isPathHighlighted) {
    this.pathHighlighted = isPathHighlighted;
  };

  this.vertexFrom = vertexFrom;
  this.vertexTo = vertexTo;

  this.weight = Math.round(
    Math.sqrt(
      Math.pow(
        parseFloat(vertexFrom.position.x) - parseFloat(vertexTo.position.x),
        2
      ) +
        Math.pow(
          parseFloat(vertexFrom.position.y) - parseFloat(vertexTo.position.y),
          2
        )
    )
  );

  let textPos = {
    x:
      parseFloat(vertexFrom.position.x) +
      (parseFloat(vertexTo.position.x) - parseFloat(vertexFrom.position.x)) / 2,
    y:
      parseFloat(vertexFrom.position.y) +
      (parseFloat(vertexTo.position.y) - parseFloat(vertexFrom.position.y)) / 2
  };
  let textSize = SIZE / 2;
  let strokeWeight = SIZE / 20;

  this.render = function(buffer) {
    
    buffer.stroke(83, 216, 251);
    if (this.highlighted) buffer.stroke("#E83562");
    if (this.pathHighlighted) buffer.stroke("#20c611");
    buffer.fill("#DCE1E9");

    buffer.strokeWeight(strokeWeight);
    buffer.line(
      vertexFrom.position.x,
      vertexFrom.position.y,
      vertexTo.position.x,
      vertexTo.position.y
    );

    buffer.fill("#66C3FF");
    buffer.strokeWeight(0);
    buffer.textSize(textSize);
    buffer.textAlign(CENTER, CENTER);
    buffer.text(this.weight, textPos.x, textPos.y);
  };
}
