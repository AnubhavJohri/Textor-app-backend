const { Schema  } = require('mongoose');
const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex' , true);


//THESE URLS ARE WHERE DATABASE IS STORED
//DONT TOUCH THE URLS
//------------------------------------------------------------------------------------------------------------------
//1.)COSMOS MONGODB URL
//OFFLINE ONLY
//FOR OFFLINE USE AND TESTING
const url = "mongodb://localhost:27017/TextorDB";
//2.)mLab MONGODB URL
//ONLINE ONLY
//FOR DEPLOYEMENT AND CLOUD USE
const MONGOLAB_URI= "mongodb://heroku_gnld3pfw:j3ua0r70ihr805ov8ma7do4fkj@ds261077.mlab.com:61077/heroku_gnld3pfw";
//------------------------------------------------------------------------------------------------------------------


//USER COLLECTION SCHEMA
const userSchema = Schema({
    userId : { type:String , unique:true , required:[true,"User Id is required"] },
    userImages : [ 
        {
            imageBase64 : {type : String , require:[true,"base64 string is required"]} ,
            extractedText : {type : String , require:[true,"Extracted Text is required"]} ,
            postTime : {type : String , require:[true,"Post Time string is required"]} ,
        } ]
} , { collection : "User" , timestamp : true} );


//process.env.MONGOLAB_URI
//1.)GETS USER OBJECT FROM USER DATABASE
let collection = {};
collection.getUserCollection = () =>{
    return Mongoose.connect( MONGOLAB_URI , { useNewUrlParser: true })
    .then(database =>{
        return database.model('User' , userSchema )
    }).catch(() => {
        let e = new Error();
        e.message = "Could not connect to Database";
        e.status = 500;
        throw e;
    })
}




module.exports = collection;