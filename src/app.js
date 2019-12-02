const express = require('express');
const router = require('./routes/routing');
const bodyParser = require("body-parser");
const app = express();
// const errorLogger = require("./utilities/errorLogger");
// const requestLogger = require("./utilities/requestLogger");
const cors = require('cors') ;
const PORT = process.env.PORT || 3000;



app.use(cors()); 
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());
//app.use(requestLogger);
app.use('/image', router);
app.use('/', (req,res,next)=>{
    res.json({"message" : `Service is running fine on port ${ PORT }` });
});
//app.use(errorLogger);
app.listen(PORT, () => console.log(`Listening on port ${ PORT }`)) ;