const express = require('express') ;
const router = express.Router();
const vision = require('@google-cloud/vision');
const base64ToImage = require('base64-to-image');
const TextorService = require('../service/textor') ;


router.post("/extractImage/:emailId" , (req , res,  next) => {
    const email = req.params.emailId ;
    const base64_st = req.body.image ;
    email = email.toLowerCase();
    console.log("base64 string=",base64_st.substring(0,15));
    var imageInfo = base64ToImage(base64_st,"./"); 
    const img =  imageInfo.fileName ;
    var imageOb = {} ;
    const client = new vision.ImageAnnotatorClient({
        keyFilename: './serviceaccountkey.json'
      });
      client.textDetection(img).then(response => {
          const extractedText = response[0].fullTextAnnotation.text ;
          console.log("text got=", extractedText);

          if( extractedText.length==0 )
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