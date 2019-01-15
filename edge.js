function Edge(vertexFrom, vertexTo, weight = 0) {
  this.show = function() {
    stroke(83, 216, 251);
    fill("#DCE1E9");

    strokeWeight(SIZE / 20);
    line(
      vertexFrom.position.x,
      vertexFrom.position.y,
      vertexTo.position.x,
      vertexTo.position.y
    );

    /* Text with value
    fill("#66C3FF");
    strokeWeight(0);
    textSize(SIZE / 2);
    textAlign(CENTER, CENTER);

    var textPos = {
      x: (vertexFrom.position.x - vertexTo.position.x) * 1.5 + SIZE / 4,
      y: (vertexFrom.position.y - vertexTo.position.y) * 1.5 - SIZE / 4
    };
    text(weight, textPos.x, textPos.y);
    */
  };

  this.render = function(buffer) {
    buffer.stroke(83, 216, 251);
    buffer.fill("#DCE1E9");

    buffer.strokeWeight(SIZE / 20);
    buffer.line(
      vertexFrom.position.x,
      vertexFrom.position.y,
      vertexTo.position.x,
      vertexTo.position.y
    );
  };
}
