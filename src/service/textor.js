const TextorModel = require('../model/textor') ;
let TextorService = {} ;

TextorService.insertEntry = ( email , imageOb ) => {
    return TextorModel.insertEntry( email , imageOb ).then( result => {
        let e = new Error() ;
        if ( result == 101 )
        console.log(" Image Object didn't add in the database ");
        else if ( result == 102 ) 
        console.log(` New document for ${email} didn't create`);
        return imageOb.extractedText ;
    } )
    

}


module.exports = TextorService ;