//Import the node modules needed
const express = require('express'); //Manages the HTTP
const cors = require('cors')  //Prevents cross origin issues
const app = express();  //Add the express to an app object
const path = require("path");  //For directory management
const bodyParser = require('body-parser');  //Manages JSON messages.

//Add the CORS to the app object
app.use(cors());

//A bit of security.  Says what sites can access the server. 
//This setup allows any site to access.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

//Set up the JSON parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Define an alias to use to get to a specific folder.
//For example, with this, you can say client/js to pull in files from the js folder
app.use("/client", express.static(path.resolve(__dirname + "/../client/")));


//Page listeners
var router = require("./router.js");  //Imports the file
router(app);


//Service listeners
var services_sql = require("./services.js");  //imports the file
services_sql(app);

//make the server
var server;
var port = 5000;  //Pick a number but make sure the port is not used by something else. I typically use 5000 or 4000 or 3000

//Start the server
server = app.listen(port, function(err) {
    if (err) {
      throw err;
    }
    console.log("Listening on port " + port);  //I like confirmation that the server loads
});