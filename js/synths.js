//Tone.js Synths//

//NOTE IN THIS ITERATION OF THE APP NOT ALL EFFECTS AND SYNTHS ARE USED

//Tone.js variables!
//
//Effects
let verb = new Tone.Freeverb().toMaster();
// create tonejs effects
var autoPanner = new Tone.AutoPanner("4n").toMaster().start();
var ping = new Tone.PingPongDelay("16n", 0.3).toMaster();

//SYNTHS USED IN THIS ITERATION:////////////////////////////////////////////////
var synth = new Tone.Synth({
  oscillator: {
    type: 'sine',
    modulationType: 'sine',
    modulationIndex: 4,
    harmonicity: 4
  },
  envelope: {
    attack: 0.1,
    decay: 0.2,
    sustain: 0.1,
    release: 0.2,
  }
}).toMaster();

var synth2 = new Tone.MembraneSynth({
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.1,
    release: 0.01,
    attackCurve: 'exponential'
  }
}).toMaster()

var synth3 = new Tone.Synth({
  oscillator: {
    type: 'square',
    modulationType: 'sawtooth',
    modulationIndex: 3,
    harmonicity: 3.4
  },
  envelope: {
    attack: 0.002,
    decay: 0.1,
    sustain: 0.1,
    release: 0.1
  }
}).connect(verb);

//VOLUMES
synth.volume.value = -10;
synth2.volume.value = -10;
synth3.volume.value = -20;

// synth4.volume.value = -20;
// pingSynth.volume.value = -16;
// conga.volume.value = -10;
// conga2.volume.value = -10;

//SYNTHS NOTE USED IN THIS ITERATION:////////////////////////////////////////////////
// var thinSaw = new Tone.FMSynth({
//     "harmonicity": 0.5,
//     "modulationIndex": 1.2,
//     "oscillator": {
//         "type": "fmsawtooth",
//         "modulationType" : "sine",
//         "modulationIndex" : 20,
//         "harmonicity" : 3
//     },
//     "envelope": {
//         "attack": 0.05,
//         "decay": 0.3,
//         "sustain": 0.1,
//         "release": 1.2
//     },
//     "modulation" : {
//         "volume" : 0,
//         "type": "triangle"
//     },
//     "modulationEnvelope" : {
//         "attack": 0.35,
//         "decay": 0.1,
//         "sustain": 1,
//         "release": 0.01
//     }
// })
//
// var conga = new Tone.MembraneSynth({
//   "pitchDecay" : 0.008,
//   "octaves" : 2,
//   "envelope" : {
//     "attack" : 0.0006,
//     "decay" : 0.5,
//     "sustain" : 0
//   }
// }).connect(ping);
//
//
// var conga2 = new Tone.MembraneSynth({
//   "pitchDecay" : 0.008,
//   "octaves" : 2,
//   "envelope" : {
//     "attack" : 0.0006,
//     "decay" : 0.5,
//     "sustain" : 0
//   }
// }).connect(ping);
//
// //SYNTH
// var testSynth = new Tone.DuoSynth({
//   "vibratoAmount" : 0.5,
//   "vibratoRate" : 3,
//   "portamento" : 0.1,
//   "harmonicity" : 1.005,
//   "volume" : -5,
//   "voice0" : {
//     "volume" : -2,
//     "oscillator" : {
//       "type" : "sawtooth"
//     },
//     "filter" : {
//       "Q" : 1,
//       "type" : "lowpass",
//       "rolloff" : -24
//     },
//     "envelope" : {
//       "attack" : 0.01,
//       "decay" : 0.25,
//       "sustain" : 0.4,
//       "release" : 1.2
//     },
//     "filterEnvelope" : {
//       "attack" : 0.001,
//       "decay" : 0.05,
//       "sustain" : 0.3,
//       "release" : 2,
//       "baseFrequency" : 100,
//       "octaves" : 4
//     }
//   },
//   "voice1" : {
//     "volume" : -10,
//     "oscillator" : {
//       "type" : "sawtooth"
//     },
//     "filter" : {
//       "Q" : 2,
//       "type" : "bandpass",
//       "rolloff" : -12
//     },
//     "envelope" : {
//       "attack" : 0.25,
//       "decay" : 4,
//       "sustain" : 0.1,
//       "release" : 0.8
//     },
//     "filterEnvelope" : {
//       "attack" : 0.05,
//       "decay" : 0.05,
//       "sustain" : 0.7,
//       "release" : 2,
//       "baseFrequency" : 5000,
//       "octaves" : -1.5
//     }
//   }
// }).connect(verb);
//
// //PING SYNTH
// var pingSynth = new Tone.MonoSynth({
//   "oscillator": {
//     "type": "sawtooth"
//   },
//   "filter": {
//     "Q": 2,
//     "type": "highpass",
//     "rolloff": -12
//   },
//   "envelope": {
//     "attack": 0.01,
//     "decay": 0.3,
//     "sustain": 0.1,
//     "release": 0.2
//   },
//   "filterEnvelope": {
//     "attack": 0.01,
//     "decay": 0.1,
//     "sustain": 0,
//     "release": 0.1,
//     "baseFrequency": 400,
//     "octaves": -1.5
//   }
// }).toMaster();
//
// var synth4 = new Tone.Synth({
//   oscillator: {
//     type: 'sawtooth',
//     modulationType: 'sawtooth',
//     modulationIndex: 3,
//     harmonicity: 2
//   },
//   envelope: {
//     attack: 0.3,
//     decay: 0.5,
//     sustain: 0.5,
//     release: 0.8
//   }
// }).connect(verb);
