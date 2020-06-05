"use strict";

/********************************************************************
P3 - Cart 263 - April 2020
Generative Audio Visual Web App
Sonic Shapes
By: Maxime Gordon
*********************************************************************/

//SOURCES//
//
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
//
//https://www.youtube.com/watch?v=0uXDdTyYBYQ
//
//https://glitch.com/edit/#!/apple-sordid-bassoon?path=sketch.js:1:0
//
//Simple Shapes: https://p5js.org/examples/hello-p5-simple-shapes.html


//~~~~VARIABLES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//NOTE:
// In this iteration of the app only 3 combinations are actualized but its possible to create many more!
//1) AUDIO: synth: synth3Basic/synth3, sequence = notePattern (class of synth = BaseSynth)
//   VISUAL: random
//
//2) AUDIO:synth: markovSynthP4/synth2, sequence = markovPattern4 (class of synth = MarkovSynth)
//   VISUAL: random
//
//3) AUDIO: synth: synthShuffle/synth, sequence = notePattern (class of synth = ShuffleSynth)
//   VISUAL: random
//

//CREATE MARKOV PATTERNS
const mp4 = new MarkovPattern(pattern4);

//CREATE MARKOV SYNTHS
const markovSynthP4 = new MarkovSynth(mp4, '8n', 2);

// CREATE BASIC SYNTHS
const synth3Basic = new BaseSynth(notePattern, synth3, '8n', 2);

// CREATE SHUFFLE SYNTHS
const synthShuffle = new ShuffleSynth(notePattern, synth, '16n', 2)

//CREATE LOOPIES
const loopiesynth3Basic = new Loopie(synth3Basic, '4n', 0.1, '8m')
const loopieMarkovSynthP4 = new Loopie(markovSynthP4, '4n', 0, '8m')
const loopieSynthShuffle = new Loopie(synthShuffle, '8n', 0, '8m')

//CREATE LOOPIE SHAPIE (so you can pair loops and shapes)
const loopieShapie = new LoopieShapie()

// CREATE SHAPIES
const ellipseShapie = new Shapie(drawEllipse);
const squareShapie = new Shapie(drawSquare);
const ovalShapie = new Shapie(drawOval);
const halfShapie = new Shapie(drawHalfCircle);
const flowerShapie = new Shapie(drawFlower);
const starShapie = new Shapie(drawStar);

//create an array that holds all of the shapes possible
let shapies = [starShapie, flowerShapie, ovalShapie, squareShapie, halfShapie, ellipseShapie];
// used for the random shapies function
let randomShapies = [];


//~~~~INITALIZE and RESET FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//resetRandomShapies()
//
//a function that makes the randomShapies array have all the shapes inside of it
//it clones our shapies array which has all the shapes in it
function resetRandomShapies() {
  // for (let i =0; i < shapies.length; i++) {
  //   randomShapies.push(shapies[i])
  // }
  // shortcut clone array
  // clone the shapies array to a new randomShapies array
  randomShapies = [].concat(shapies)
}

//randomShapie()
//
//a function that shuffles the randomShapies array
//and pops out an element (a shape) if it has already been added
//this prevents duplicate shapes from being generated,
//there will always be different shapes on the screen
function randomShapie() {
  //create an array that will hold all the created shapies...
  shuffleNotes(randomShapies); //use our helper function ShuffleNotes to shuffle array
  if (randomShapies.length > 1) {
    return randomShapies.pop(); //pop it out so that you can't pick the same shape twice
  }
  return null;
}

// COMBINING LOOP(and synth) WITH SHAPE
//
//initLoopiesWithShapies()
//
//clear all loopies and shapies, reset array
//basically initialize for new generation
function initLoopiesWithShapies() {
  // reset our random shapies array
  resetRandomShapies();
  // clear shapies
  loopieShapie.clearShapies();
  // clear loopies and reset their values
  loopieShapie.clearLoopies();
  loopieShapie.addLoopieWithShapie(loopiesynth3Basic, randomShapie()) // draw & play
  //loopieShapie.addLoopieWithShapie(loopieSynthShuffle, ovalShapie) //draw & play
  loopieShapie.addLoopieWithShapie(loopieSynthShuffle, randomShapie()) //draw & play
  loopieShapie.addLoopieWithShapie(loopieMarkovSynthP4, randomShapie()) //draw & play
  // turn on the loopies
  loopieShapie.toggleLoopies(true) // turn loops on
  //generate a random number of points for the star!
  starPointGeneration();
}

//startLoops()
//
// when called sets resets all the loops by clearing transport events
function startLoops() {
  resetLoops() // reset loops, clear transport schedule
  console.log('~ loops started ~')
  initLoopiesWithShapies(); // initialize everything
  transportConfig(); //reset all transport schedules
  Tone.Transport.start(); // start transport
}

//resetLoops()
//
//turns transport off, loops off, clear transport schedule, put transport position to zero
function resetLoops() {
  // stop loops
  loopieShapie.toggleLoopies(false) // turn loops off
  Tone.Transport.stop(); // stop transport
  Tone.Transport.cancel(); //cancel events // clear transport
  Tone.Transport.position = '0:0:0'
}

//transportConfig()
//
//handles scheduling to do with the transport (bpm, timing of bpm ramping,
//when to stop transport if the loops are over)
function transportConfig() {
  let startingBPM = 20; // set starting bpm
  let randomBPM;
  randomBPM = Math.floor(randomInRange(100, 200));
  //Tone.Transport.lookAhead = 0.5;
  //https://github.com/Tonejs/Tone.js/wiki/Signals
  //bpm ramp that starts at the beginning
  Tone.Transport.bpm.value = 140;

  //Transport Scheduling --- for bpm
  Tone.Transport.schedule(function(time) {
    Tone.Transport.bpm.rampTo(randomBPM, 2);
  }, "0:0:1");
  // set up transporters
  //the second scheduled bpm ramp
  Tone.Transport.schedule(function(time) {
    Tone.Transport.bpm.rampTo(startingBPM, 3);
    console.log(Tone.Transport.bpm.value)
  }, "2:4:0");

  //the third bpm ramp
  Tone.Transport.schedule(function(time) {
    Tone.Transport.bpm.rampTo(200, 5);
  }, "4:0:0");

  // SCHEDULE TRANSPORT STOP && RESET WHEN LOOPS END
  Tone.Transport.scheduleOnce(function(time) {
    resetLoops(); //!
    console.log('~ transport stopped after 8m ~', time)
  }, "8m")

  // CALL WHEN TRANSPORT STOPS
  Tone.Transport.once("stop", () => console.log('~ transport reset ~'))
}

//~~~~P5~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Global p5 variables:
//
let starPointNumber; // this will be randomly generated
let titleText;
let explanationText;

//Font
let monarchFont;

//Buttons
let buttonGenerate;
let buttonStop;

//Preload
//Loading up font
function preload() {
  monarchFont = loadFont('assets/fonts/Monarch.ttf');
}

// p5 main setup
//
//createCanvas, create all text, create buttons
//bind mouse press & start/stop to buttons
function setup() {
  // Setup canvas size as a square
  createCanvas(windowWidth, windowHeight)
  //creating text
  titleText = new BasicText(150, 50, 'Sonic Shapes', 35);
  explanationText = new BasicText(125, 85, 'By Maxime Gordon', 20);
  //create buttons
  generateButton();
  stopButton();
  //bind mouse press to generate and stop buttons / loop functions
  buttonGenerate.mousePressed(startLoops);
  buttonStop.mousePressed(resetLoops);
}

//draw()
//
//p5 main draw loop
//
function draw() {
  background(200); //draw the background
  loopieShapie.drawShapies(); // loop over shapies and call their draw method
  titleText.display(); // draw the title text
  explanationText.display(); // draw the explanation text
}

//DRAW SHAPE FUNCTIONS
//
//Red Square
function drawSquare() {
  push();
  rectMode(CENTER)
  noStroke();
  fill('red')
  rect(windowWidth / 2, windowHeight / 2, 55, 55);
  pop();
}

//Black Ellipse
function drawEllipse() {
  push();
  noStroke();
  fill('black')
  ellipse(windowWidth / 2, windowHeight / 2, 200, 200);
  pop();
}

//Blue Oval
function drawOval() {
  push()
  rectMode(CENTER)
  noStroke();
  fill('blue')
  ellipse(windowWidth / 2, windowHeight / 2, 20, 300);
  pop();
}

//Pink Flower
function drawFlower() {
  push()
  translate(windowWidth / 2, windowHeight / 2);
  fill(204, 101, 192);
  noStroke();
  for (let i = 0; i < 10; i++) {
    ellipse(0, 30, 60, 100);
    rotate(PI / 5);
  }
  pop();
}

//Yellow HalfCircle
function drawHalfCircle() {
  push()
  fill(255, 255, 0);
  noStroke();
  translate(windowWidth / 2, windowHeight / 2);
  arc(0, 0, 280, 280, PI, TWO_PI);
  pop()
}

//GreenStar with Randomized points
function drawStar() {
  push()
  fill(0, 255, 0);
  noStroke();
  translate(windowWidth / 2, windowHeight / 2);
  star(0, 0, 10, 150, starPointNumber);
  pop();
}

//https://p5js.org/examples/form-star.html
//star()
//create a star shape
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

//starPointGeneration()
//
//generate a random number of points for the star
//gets called in initLoopiesWithShapies
//returns the randomly generated number
function starPointGeneration() {
  starPointNumber = Math.floor(randomInRange(3, 8));
  return starPointNumber;
};

//BUTTON FUNCTIONS
//
//generateButton()
//
//styling for a button that generates the loops and shapes starting
function generateButton() {
  buttonGenerate = createButton("Generate");
  buttonGenerate.size(80, 25);
  buttonGenerate.style("font-family", "Arial");
  buttonGenerate.style("font-size", "15px");
  buttonGenerate.style('border', '2px solid black')
  buttonGenerate.position(30, 110);
};

//stopButton()
//
//styling for a button that stops the loops and shapes (and resets them)
function stopButton() {
  buttonStop = createButton("Stop");
  buttonStop.size(80, 25);
  buttonStop.style("font-family", "Arial");
  buttonStop.style("font-size", "15px");
  buttonStop.style('background-color', 'rgb(0, 0, 0)')
  buttonStop.style('color', 'rgb(255, 255,255)')
  buttonStop.style('border', '2px solid white')
  buttonStop.position(140, 110);
};
// ~~~~~~~~~~~~~~
