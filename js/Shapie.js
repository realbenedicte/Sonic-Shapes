//Shapie Class
//
class Shapie {
  //shapeDraw is a function that is defined in the p5 section where we define what shapes to draw
  constructor(shapeDraw) {
    this.visible = false //set the shape to be invisible (initially)
    this.shapeDraw = shapeDraw
    // bind function so that class variables are accessible in function
    // in other words change 'this' to reference class instead of function
    this.toggleVisible = this.toggleVisible.bind(this) // bind to class otherwise this in function references the function not class
    this.draw = this.draw.bind(this) // bind to class otherwise this in function references the function not class
  }

  // schedule our shapie to turn on and off
  //this eventually gets called in our LoopieShapie class
  //see: loopie.setOnNoteTrigger(shapie.toggleVisible)

  toggleVisible(visible) {
    this.visible = visible //this.visible is a boolean
  }
  // main shapie draw method -> draw if visible is true
  draw() {
    if (this.visible) { //if this.visible ===true, draw the shape
      this.shapeDraw()
    }
  }
}
