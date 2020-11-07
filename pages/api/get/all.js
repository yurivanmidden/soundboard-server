// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req, res) {

  const fs = require('fs');
  const mediatags = require('jsmediatags');
  const audioDir = `${process.env.SOUNDS_DIR}`;

  getTitlesInDirectory(function (result) {
    console.log(result);
  })

  function getTitlesInDirectory(callback) {
    fs.readdir(audioDir, (err, files) => {
      if (err) {
        res.end(`err`); 
      } else {
      
      }
    });
  }

  function readTags(tagsCallback) {
    var allTags = new Array();
    files.map(async element => {
      mediatags.read(element, {
        onSuccess: function(tag) {
          allTags.push(tag.tags.title ? tag.tags.title.toString() : "unknown");
        }
      })
    });
  }

  res.end();
  
  // var filesInDir;
  
  // var filesInDir = new Array();
  
  // var filesInDir = new Promise(function(resolve, reject) {
  //   fs.readdir(audioDir, (err, files) => {
  //     if (err) {
  //       res.end(`err`); 
  //     } else {
  //       result = files;
  //   });
  // }
  //   function getFilesInDir() {
    
  // };

  // async function doIets() {
  //   console.log(await getFilesInDir())
  // }
  

  // var allTags = [] = filesInDir.map(element => {
  //   mediatags.read(element, {
  //     onSuccess: function(tag) {
  //       allTags.push(tag.tags.title ? tag.tags.title.toString() : "unknown");
  //     }
  //   })
  // });

  // doIets();

  // // console.log(allTags);
  // res.end()


}