// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Howl, Howler } from 'howler';

export default (req, res) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })

  const lame = require('@suldashi/lame');
  const Speaker = require('speaker');
  const fs = require('fs');

  const speaker = new Speaker({
    channels: 2,
    bitDepth: 16,
    sampleRate: 44100
  })

  var decoder = new lame.Decoder();
  var input = fs.createReadStream('pages/api/sounds/preview.mp3');
  input.pipe(decoder).pipe(speaker);
  

  var sound = new Howl({
    src: ['sounds/sound.mp3']
  });

  sound.play();
  console.log('Play sound');
}
