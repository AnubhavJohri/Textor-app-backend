const express = require('express') ;
const router = express.Router();
const vision = require('@google-cloud/vision');
const base64ToImage = require('base64-to-image');
const TextorService = require('../service/textor') ;
const fs = require('fs') ;


router.post("/extractImage/:emailId" , (req , res,  next) => {
    var email = req.params.emailId ;
    var base64_st = req.body.image ;
    email = email.toLowerCase();
    console.log("base64 string=",base64_st.substring(0,15));
    var imageInfo = base64ToImage(base64_st,"./"); 
    var img =  imageInfo.fileName ;
    var imageOb = {} ;
    const client = new vision.ImageAnnotatorClient({
        keyFilename: './serviceaccountkey.json'
      });
      client.textDetection(img).then(response => {
          const extractedText = response[0].fullTextAnnotation ? response[0].fullTextAnnotation.text : null ; 
          console.log("text got=", extractedText);
          fs.unlink(img, function (err) {
            if (err) 
            console.log("error=",err.message);
            else  
            console.log('File deleted!');
            // if no error, file has been deleted successfully
           }); 
          if( !extractedText )
          res.json( { "message" : " Image had no string " } ) ;
          else{
              imageOb["postTime"] = new Date().toLocaleString() ;
              imageOb["extractedText"] = extractedText ;
              imageOb["imageBase64"] = base64_st ;
               return TextorService.insertEntry( email , imageOb ).then( result => {
                  res.json( { "message" :  result } ) ;
            } )

          }
        }).catch(err => next(err))
})

module.exports = router ;