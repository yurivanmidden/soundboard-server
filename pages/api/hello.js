
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
  var input = fs.createReadStream('pages/api/sounds/3.mp3');
  input.pipe(decoder).pipe(speaker);

  tags.read('pages/api/sounds/1.mp3', { 
    onSuccess: function(tag) {
      console.log(tag);
      // res.json({title: `${tag.tags.title}`})
    }
  });

  const audioDir = "pages/api/sounds/";

  var allFiles = fs.readdirSync(`${audioDir}`);
  
  const getAllTags = async() => {
    var allTags = [];
    fs.readdirSync(`${audioDir}`).map(file => {
      tags.read(`${audioDir}${file}`, { 
        onSuccess: function(tag) {
          console.log(tag.tags.title);
          allTags.push(tag.tags.title ? tag.tags.title.toString() : 'unknown');
          // console.log(allTags);
          // res.json({title: `${tag.tags.title}`})
        }
      });
    });
    return allTags;
  }

  getAllTags().then((result) => {
    console.log(result);
    res.json({songs: JSON.stringify(result)});
  });

  // allFiles.map(file => {
  //   tags.read(`${audioDir}${file}`, { 
  //     onSuccess: function(tag) {
  //       console.log(tag.tags.title);
  //       // console.log(allTags);
  //       // res.json({title: `${tag.tags.title}`})
  //     }
  //   });
  // });

  // console.log(`FINAL SPUL: ${allTags}`);
    
  // res.json({songs: JSON.stringify(allTags)});

  
  console.log('Play sound');
}
