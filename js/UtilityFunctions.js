//Utility Functions//

//shuffleNotes(array)
//
//array shuffler!
//input an array, outputs same array but shuffled
function shuffleNotes(array) {
  let currentIndex = array.length;
  let temporaryValue, newRandom;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//randomInRage()
//
//returns a randmon float between a min and a max
function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}

//windowResized()
//
//if the window is resized, resize the canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
