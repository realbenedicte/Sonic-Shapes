"use strict";
// BasicText
//
// A class that represents a simple text object

class BasicText {
  // constructor
  //
  // Sets the initial values for the text
  constructor(x, y, text, fontSize) {
    // Position
    this.x = x;
    this.y = y;
    this.text = text;
    this.fontSize = fontSize;
  }
  //method that actually draws the text 
  display() {
    push();
    fill(0);
    textFont(monarchFont);
    textAlign(CENTER);
    textSize(this.fontSize);
    text(this.text, this.x, this.y);
    pop();
  }
}
