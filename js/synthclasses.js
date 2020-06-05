// BaseSynth
// Parent synth class that implements playing of sequences
class BaseSynth {
  constructor(sequence = null, synth = null, duration = '8n', maxRepeats = 1) {
    // basic synth params
    this.index = 0;
    this.playCount = 0;
    this.duration = duration
    this.maxRepeats = maxRepeats;
    this.sequence = sequence
    this.synth = synth

    // set this to be called when the sequence ends (assignable see below for examples)
    this.onSequenceOver = null

    // bind methods
    this.getSequence = this.getSequence.bind(this) // a getter for our sequence
    this.getSynth = this.getSynth.bind(this) // a getter for our synth
    this.reset = this.reset.bind(this) // main play function
    this.play = this.play.bind(this) // main play function
  }
  // overridable method for retrieving the sequence
  getSequence() {
    return this.sequence
  }
  // overridable method for retrieving the synth
  getSynth() {
    return this.synth
  }
  // reset synth values
  reset() {
    // reset our counters
    this.index = 0
    this.playCount = 0
    // randomize sequence
    if (this.sequence != null) {
      shuffleNotes(this.sequence) //shuffleNotes is our helper function that randomizes array
    }
  }
  // our main play function
  play(time) {
    //this will give us the reference of a note pattern array
    let currentSequence = this.getSequence()
    let currentSynth = this.getSynth()

    // helpful debug let us know what we're playing
    if (this.index === 0 && currentSequence != null) {
      // console.log('playing sequence ', currentSequence)
    } else if (currentSequence == null || currentSynth == null) { // if no sequence exit function
      console.log("no sequence or synth found, exiting!")
      return
    } else if (this.index >= currentSequence.length) {
      this.index = currentSequence.length - 1;
    }

    //the note starts off at index 0 , this is set to be the current sequences index #
    let note = currentSequence[this.index];
    let duration = this.duration;

    if (note !== null) {
      currentSynth.triggerAttackRelease(note, duration, time); // ToneJS play note
      //see what note in the currentSequence's array is being played
      // console.log('playing note ' + note + ' and index ' + this.index + " with duration: " + duration)
    }

    // reached end of sequence
    if (this.index === currentSequence.length - 1) {
      this.index = 0; // reset index
      this.playCount++; // increment play count

      // reached max repeats
      if (this.playCount === this.maxRepeats) {
        this.playCount = 0; // reset play count
        // call this function when we reach the end of sequence max play throughs ( if it exists )
        // eg. noteShuffle, markovChain.next(), etc
        if (this.onSequenceOver != null) {
          this.onSequenceOver()
        }
      }
    } else {
      //increment it by 1 each time, this will update which note will be played
      this.index++;
    }
  }
}

// ShuffleSynth shuffles sequence at end of loop
class ShuffleSynth extends BaseSynth {
  constructor(sequence, synth, duration, maxRepeats = 1) {
    super(sequence, synth, duration, maxRepeats)

    // on sequence over -> shuffle sequence
    this.onSequenceOver = () => {
      shuffleNotes(this.sequence);
    }
  }
}

//Markov Synths, they take a markov pattern, how long a note should be played,
//and how many times the pattern should be played
class MarkovSynth extends BaseSynth {
  constructor(pattern, duration, maxRepeats = 1) {
    super(null, null, duration, maxRepeats)
    // markov synth specific properties
    this.pattern = pattern
    this.chainControl = pattern.chainControl

    // on sequence over -> call next item in markov chain
    this.onSequenceOver = () => {
      this.chainControl.next()
    }
  }
  // get sequence using markov value
  getSequence() {
    return this.pattern.obj[this.chainControl.value].sequence
  }
  // get synth using markov value
  getSynth() {
    return this.pattern.obj[this.chainControl.value].synth
  }
}

// MarkovPattern
// takes a pattern object and builds a markov chain from it
class MarkovPattern {
  constructor(pattern) {
    console.log("creating markov pattern ")
    // creating a Tone.CtrlMarkov manager
    this.obj = pattern // assign main pattern object
    let markovChain = {} // create empty markov chain
    // for each key in the pattern (eg: beginning, middle, altMiddle, end)
    for (let key in pattern) {
      let links = pattern[key].links // extract the links from the pattern (markov neighbours and probabilities)
      markovChain[key] = links // incrementally build our markovChain
    }
    // finally create our MarkovControl
    this.chainControl = new Tone.CtrlMarkov(markovChain) // This is where we store the Tone.MarkovControl
  }
}
