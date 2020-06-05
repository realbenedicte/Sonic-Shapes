//Markov Pattern Objects
//contains a sequence and synth as well as links and probabilities

//IN THIS ITERATION ONLY PATTERN4 is used

const pattern4 = {
  "beginning": {
    "sequence": notePatternTwo,
    "synth": synth2,
    "links": [{
        "value": "end",
        "probability": 0.25
      },
      {
        "value": "middle",
        "probability": 0.25
      },
      {
        "value": "altMiddle",
        "probability": 0.8
      }
    ]
  },
  "altMiddle": {
    "sequence": notePattern,
    "synth": synth2,
    "links": [{
        "value": "end",
        "probability": 0.4
      },
      {
        "value": "middle",
        "probability": 0.4
      }
    ]
  },
  "middle": {
    "sequence": twoNotes,
    "synth": synth2,
    "links": "end"
  },

  "end": {
    "sequence": twoNotes,
    "synth": synth2,
    "links": "beginning"
  },
};


// UNUSED PATTERNS IN THIS ITERATION ///////////////////////////////////////////
//
// const pattern1 = {
//   "beginning": {
//     "sequence": sequenceOne,
//     "synth": conga,
//     "links": [
//       {
//         "value": "end",
//         "probability": 0.25
//       },
//       {
//         "value": "middle",
//         "probability": 0.25
//       },
//       {
//         "value": "altMiddle",
//         "probability": 0.8
//       }
//     ]
//   },
//   "altMiddle": {
//     "sequence": sequenceThree,
//     "synth": conga,
//     "links": [
//       {
//         "value": "end",
//         "probability": 0.4
//       },
//       {
//         "value": "middle",
//         "probability": 0.2
//       }
//     ]
//   },
//   "middle": {
//     "sequence": sequenceTwo,
//     "synth": conga,
//     "links": "end"
//   },
//   "end": {
//     "sequence": sequenceFour,
//     "synth": conga,
//     "links": "beginning"
//   },
// };
//
//
// const pattern2 = {
//   "beginning": {
//     "sequence": sequenceFive,
//     "synth": synth4,
//     "links": [
//       {
//         "value": "end",
//         "probability": 0.25
//       },
//       {
//         "value": "middle",
//         "probability": 0.25
//       },
//       {
//         "value": "altMiddle",
//         "probability": 0.5
//       }
//     ],
//   },
//   "altMiddle": {
//     "sequence": sequenceFour,
//     "synth": synth4,
//     "links": [
//       {
//         "value": "end",
//         "probability": 0.8
//       },
//       {
//         "value": "middle",
//         "probability": 0.2
//       }
//     ],
//   },
//   "middle": {
//     "sequence": sequenceThree,
//     "synth": synth4,
//     "links": "end"
//   },
//
//   "end": {
//     "sequence": sequenceSix,
//     "synth": synth4,
//     "links": "beginning"
//   },
// };
//
// const pattern3 = {
//   "beginning": {
//     "sequence": sequenceFive,
//     "synth": synth2,
//     "links": [
//       {
//         "value": "end",
//         "probability": 0.25
//       },
//       {
//         "value": "middle",
//         "probability": 0.25
//       },
//       {
//         "value": "altMiddle",
//         "probability": 0.8
//       }
//     ]
//   },
//   "altMiddle": {
//     "sequence": sequenceFour,
//     "synth": synth2,
//     "links": [
//       {
//         "value": "end",
//         "probability": 0.4
//       },
//       {
//         "value": "middle",
//         "probability": 0.4
//       }
//     ]
//   },
//   "middle": {
//     "sequence": sequenceThree,
//     "synth": synth2,
//     "links": "end"
//   },
//
//   "end": {
//     "sequence": sequenceSix,
//     "synth": synth2,
//     "links": "beginning"
//   },
// };
//
// const pattern5 = {
//   "beginning": {
//     "sequence": notePattern,
//     "synth": synth,
//     "links": [
//       {
//         "value": "end",
//         "probability": 0.25
//       },
//       {
//         "value": "middle",
//         "probability": 0.25
//       },
//       {
//         "value": "altMiddle",
//         "probability": 0.8
//       }
//     ]
//   },
//   "altMiddle": {
//     "sequence": notePatternTwo,
//     "synth": synth,
//     "links": [
//       {
//         "value": "end",
//         "probability": 0.4
//       },
//       {
//         "value": "middle",
//         "probability": 0.4
//       }
//     ]
//   },
//   "middle": {
//     "sequence": twoNotes,
//     "synth": synth,
//     "links": "end"
//   },
//
//   "end": {
//     "sequence": twoNotes,
//     "synth": synth,
//     "links": "beginning"
//   },
// };
