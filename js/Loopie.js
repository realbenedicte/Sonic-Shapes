//Loopie Class
//
//Creates a loop that gets told what synth to loop, what interval to loop at
class Loopie {
  constructor(synth, interval = '4n', loopStart = 0, loopStop = '12m') { //defined some defaults
    // loop started
    this.running = true;
    // synth and interval
    this.synth = synth
    this.time = 0
    this.interval = interval
    // loop start and end times
    this.loopStart = loopStart;
    this.loopStop = loopStop; // how long is the loop supposed to loop for?

    // onNoteTrigger function that shapie can attach to
    this.onNoteTrigger = null

    // create Tone.JS loop and bind it to play method (DONT FORGET THE INTERVAL)
    this.loop = new Tone.Loop(
      this.synthLoop.bind(this) // the main synth loop (bind here)
      , interval) // interval // the interval at which the loop should repeat
    // bind function so that class variables are accessible in function
    // in other words change 'this' to reference class instead of function
    this.toggleLoop = this.toggleLoop.bind(this) // bind to class otherwise this in function references the function not class
    this.onNote = this.onNote.bind(this) // bind to class otherwise this in function references the function not class
    this.setOnNoteTrigger = this.setOnNoteTrigger.bind(this) // bind to class otherwise this in function references the function not class
    this.resetLoopie = this.resetLoopie.bind(this) // bind to class otherwise this in function references the function not class
  }
  // turn loop  on/off
  toggleLoop(start) {
    if (start) {
      this.loop.start(this.loopStart).stop(this.loopStop) // turn the ToneJS loop on
      Tone.Transport.scheduleOnce(() => console.log("~~~~~ LOOP: ", this.loopStop, "ENDED ", this.time), this.loopStop)
    } else {
      this.loop.stop() // turn the ToneJs loop off
    }
  }

  // reset synth and clear onNote event binding
  resetLoopie() {
    if (this.synth != null) {
      this.synth.reset()
    }
    if (this.onNoteTrigger != null) {
      this.onNoteTrigger = null
    }
  }
  // attach a function to onNote event handler
  setOnNoteTrigger(trigger) {
    this.onNoteTrigger = trigger;
  }
  // onNote event handler
  onNote(noteOn) {
    if (this.onNoteTrigger != null) {
      this.onNoteTrigger(noteOn)
    }
  }
  // synth loop, this function is passed to create a ToneJS.Loop ( see above `this.loop` )
  // plays the synth
  // has onNote event handler
  synthLoop(time) {
    // trigger synth
    let loopie = this
    this.time = time
    this.synth.play(time)
    // call on synth note on
    Tone.Draw.schedule(() => {
      loopie.onNote(true) //when the loop is called a shape is drawn
    }, time)
    // call on synth note off
    Tone.Draw.schedule(() => {
      //after the duration of the synth.duration the note turns off dissapears
      //-> this corresponds to the shapie being drawn
      loopie.onNote(false)
    }, Tone.TransportTime(time) + Tone.TransportTime(this.synth.duration))
  }
}
