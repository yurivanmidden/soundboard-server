import { time } from 'console';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default (req, res) => {
  res.statusCode = 200

  const lame = require('@suldashi/lame');
  const Speaker = require('speaker');
  const fs = require('fs');
  const tags = require('jsmediatags');

  const speaker = new Speaker({
    channels: 2,
    bitDepth: 16,
    sampleRate: 44100
  })

  var decoder = new lame.Decoder();
  var input = fs.createReadStream('pages/api/sounds/erreur.mp3');
  input.pipe(decoder).pipe(speaker);

  tags.read('pages/api/sounds/erreur.mp3', { 
    onSuccess: function(tag) {
      console.log(tag);
      // res.json({title: `${tag.tags.title}`})
    }
  });

  const audioDir = "pages/api/sounds/";

  var allFiles = fs.readdirSync(`${audioDir}`);
  var allTags = new Array();
  // var now = time.now();
  allFiles.map(file => {
    tags.read(`${audioDir}${file}`, { 
      onSuccess: function(tag) {
        console.log(tag.tags.title);
        allTags.push(tag.tags.title);
        // res.json({title: `${tag.tags.title}`})
      }
    });
  });
    
  res.json({songs: allTags});

  
  console.log('Play sound');
}
