const collection = require('../utilities/connection') ;
let TextorModel = {} ;



TextorModel.insertEntry = ( email , imageOb ) => {
    return collection.getUserCollection().then( db => {
        return db.find( { userId : email }).then( findResult => {
            //CONDITION 1 :- FINDS IF EMAIL ENTERED IS PRESENT OR  NOT
            // IF NOT FOUND CREATE ONE DOCUMENT OF THAT EMAIL ID AND PUSH THE IMAGE 
            if ( !findResult[0] )
            {
                const ob = {} ; ob["userId"] = email ; ob["userImages"] = [] ;
                //CREATE DOCUMENT FOR THAT EMAIL ID
                return db.insertMany( ob ).then( insertResult =>
                     {
                        if( insertResult.length > 0 )
                        {   //INSERT IMAGE OBJECT IN THAT DOCUMENT
                            return db.updateOne( { userId : email } , { $push : { userImages : imageOb } } ).then( updateResult => 
                                {
                                    if ( updateResult.nModified > 0 )
                                    return imageOb.extractedText ;
                                    else
                                    return 101;
                                } )
                        }else
                            return 102 ;
                        
                    } )
                }
                //IF EMAIL ID ALREADY EXISTS SIMPLY PUSH IMAGE OBJECT IN DB
                else
                {
                    return db.updateOne( { userId : email } , { $push : { userImages : imageOb } } ).then( updateResult => 
                    {
                        if ( updateResult.nModified > 0 )
                        return imageOb.extractedText ;
                        else
                        return 101;
                    } )
                }
        } )
    } )


    

}


TextorModel.extractHistory = ( email ) => {
    return collection.getUserCollection().then( db => {
        return db.find({ userId : email }).then( findResult => {
            console.log("result=",findResult,email);
            
            if ( findResult[0] )
            return findResult[0].userImages ;
            else
            return null ;
        } )
    })
}

module.exports = TextorModel ;