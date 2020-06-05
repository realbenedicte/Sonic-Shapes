# Sonic Shapes
### By Maxime Gordon

## Uses Javascript libraries:

- Tone.js: https://tonejs.github.io/
- p5.js: https://p5js.org/

## Artist's Statement:
Sonic Shapes is a web application that allows the user to generate random visuals and sounds. The sounds are Web Audio synths created using the Tone.js library. The visuals are a series of shapes created using the p5.js library. When the user presses the ‘Generate’ button each synth is paired with a random shape (note: the shape doesn’t need to be random, but in this iteration of the code I made it that way!) and the sound and visuals start to play. A shape appears when a note is played by the synth and disappears when the note of the synth turns off. The effect is an audio-visual experience with sound and visuals appearing seamlessly together. The audio is also semi-randomly generated as there are markov chains incorporated into some of the synths that determine which sequence of notes to play. The sequence of notes for certain synths is also shuffled so no loop of notes repeats itself.

My inspiration for this piece came from listening to generative sound pieces. I really wanted to make something that when prompted to start would be able to create a song by following some rules outlined in an algorithm. I also was interested in generative visuals works and thought combining generative sound with generative visuals would create an engaging experience.

While I am happy with how Sonic Shapes turned out there is a lot more that I could do to make the user experience as well as the actual audio/visual result more interesting. Going further I would like to generate a more musical sounding audio piece, and give the user options about what key to play in. Furthermore, I would like to expand the randomness of the shapes and code more options for them too. Luckily, the code I’ve created allows for a lot more experimentation with synth, sequences (note patterns) and visuals so I just need to tweak a few things to create radically different results. I would eventually like to give the user the ability to also change between synths and visuals.

I’m excited to develop Sonic Shapes further to create more complex generated audio/visual compositions.
