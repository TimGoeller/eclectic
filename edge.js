var SIZE = 30;

function Edge( vertexFrom, vertexTo, weight = 0 ) {
  this.show = function() {
    stroke(83,216,251);
    fill("#DCE1E9");

    strokeWeight(SIZE/20);
    line( vertexFrom.position.x, vertexFrom.position.y, vertexTo.position.x, vertexTo.position.y );
    /* Text with value */
    fill("#1C3646");
    stroke("#1C3646");
    strokeWeight(1);
    textSize(SIZE / 2);
    textAlign(CENTER, CENTER);

    var textPos = {
        x: vertexFrom.x - vertexTo.x,
        y: vertexFrom.y - vertexTo.y,
    }
    text(weight, textPos.x, textPos.y );
  };
}
