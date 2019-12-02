const express = require('express') ;
const router = express.Router();
const vision = require('@google-cloud/vision');
const base64ToImage = require('base64-to-image');


router.post("/extractImage/:emailId" , (req , res,  next) => {
    const email = req.params.emailId ;
    const base64_st = req.body.image ;
    email = email.toLowerCase();
    console.log("base64 string=",base64_st.substring(0,15));
    var imageInfo = base64ToImage(base64_st,"./"); 
    console.log("image=",imageInfo.fileName);   
    const img =  imageInfo.fileName ;
    const client = new vision.ImageAnnotatorClient({
        keyFilename: './serviceaccountkey.json'
      });
      client.textDetection(img).then(response => {
          console.log("text got=", response[0].fullTextAnnotation.text);
        }).catch(err => next(err))
})

module.exports = router ;