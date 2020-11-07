// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req, res) {
  const {
    query: { id },
  } = req;

  const lame = require('@suldashi/lame');
  const Speaker = require('speaker');
  const fs = require('fs');
  const mediatags = require('jsmediatags');
  const audioDir = `${process.env.SOUNDS_DIR}`;

  const speaker = new Speaker({
    channels: 2,
    bitDepth: 16,
    sampleRate: 44100
  })

  var decoder = new lame.Decoder();
  
  try {
    if (fs.existsSync(`${audioDir}/${id}.mp3`)){
      var input = fs.createReadStream(`${audioDir}/${id}.mp3`);
      input.pipe(decoder).pipe(speaker);
      res.statusCode = 200;
      mediatags.read(`${audioDir}/${id}.mp3`, {
        onSuccess: function(tag) {
          let result = tag.tags.title ? tag.tags.title.toString() : "unknown";
          res.end(result);
        }
      });
    } else {
      res.statusCode = 404;
      res.end('404 | Does not exist');
    }
  } catch(err) {
    res.end(err);
  }
}