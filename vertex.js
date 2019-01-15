function Vertex(x = 0, y = 0, value = "") {
  this.position = createVector(x, y);

  this.show = function() {
    stroke(83, 216, 251);
    fill("#DCE1E9");

    strokeWeight(SIZE / 10);
    ellipse(this.position.x, this.position.y, SIZE);

    /* Text with value */
    fill("#1C3646");
    stroke("#1C3646");
    strokeWeight(1);
    textSize(SIZE / 2);
    textAlign(CENTER, CENTER);
    text(value, this.position.x, this.position.y + SIZE / 20);
  };
}
