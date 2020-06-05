// Loopie Shapie is a class that combines sound with visuals
//
class LoopieShapie {
  constructor() {
    this.shapies = [] // an array for the shapes to be drawn
    this.loopies = [] // array of loopies
    // bind methods so that 'this' refers to class
    this.addLoopieWithShapie = this.addLoopieWithShapie.bind(this)
    this.drawShapies = this.drawShapies.bind(this)
    this.toggleLoopies = this.toggleLoopies.bind(this)
    this.clearShapies = this.clearShapies.bind(this)
    this.clearLoopies = this.clearLoopies.bind(this)
  }

  // remove all shapies from shapies array
  clearShapies() {
    this.shapies = [];
  }

  // clear our loopies (in addition reset synth counters)
  clearLoopies() {
    // first go over our loopies and reset them
    for (let i = 0; i < this.loopies.length; i++) {
      this.loopies[i].resetLoopie()
    }
    // clear loopies array
    this.loopies = []
  }
  // add a shapie to drawing stack and add shapie reference to loopie
  addLoopieWithShapie(loopie, shapie) {

    if (shapie != null) {
      this.shapies.push(shapie) // add shapie to our shapie stack
    }

    if (loopie != null) {
      this.loopies.push(loopie) // add loopie to our loopie stack
    }

    if (shapie != null && loopie != null) {
      loopie.setOnNoteTrigger(shapie.toggleVisible) // when the synth plays trigger a visual
      //toggleVisible is a method of the Shapie class, when u get a generic shape of class Shapie,
      //you can toggle it on and off by calling the toggleVisible method on it
    }
  }
  // start our loops
  toggleLoopies(start) {
    // iterate over loopies and initialize the loop
    for (let i = 0; i < this.loopies.length; i++) {
      let loopie = this.loopies[i]
      loopie.toggleLoop(start)
    }
  }
  // draw shapes
  drawShapies() {
    // iterate over shapies and call their draw
    for (let i = 0; i < this.shapies.length; i++) {
      let shapie = this.shapies[i]
      shapie.draw()
    }
  }
}
