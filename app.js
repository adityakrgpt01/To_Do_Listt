var express = require('express');
var url = require('url');
const mongoose = require('mongoose');
const path = require('path')
var router = express.Router();
var app = express();

const port=4000;

const publicDirectoryPath = path.join(__dirname, './static') 


 
app.use(express.static(publicDirectoryPath)) 
 



var uri = "mongodb://localhost:27017/kennel";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});


app.use('/',router);


app.get('/', function (req, res) {

    res.writeHead(200, {  
        'Content-Type': 'text/plain'  
    });  
    res.write("This is Test Message.");  
    res.end();
  
});
app.listen(port, function () {
  console.log('Example app listening on port' + port);
});







//module.exports = app;