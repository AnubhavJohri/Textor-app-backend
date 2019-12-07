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

TextorService.extractHistory = ( email ) => {
    return TextorModel.extractHistory( email ).then( result => {
        let e = new Error() ;
        if( result )
        return result ;
        else{
            e.message = "Either the Email-id isn't regisered or their's no image with text to display" ;
            e.status = 402 ;
            throw e ;
        }
    } )
}
module.exports = TextorService ;