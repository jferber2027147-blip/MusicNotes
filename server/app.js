
const express = require('express'); //Manages the HTTP
const cors = require('cors')  //Prevents cross origin issues
const app = express();  //Add the express to an app object
const path = require("path");  //For directory management
const bodyParser = require('body-parser');  //Manages JSON messages.

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use("/client", express.static(path.resolve(__dirname + "/../client/")));


var router = require("./router.js");  //Imports the file
router(app);

var services_sql = require("./services.js");  //imports the file
services_sql(app);


var server;
var port = 5000;  //Pick a number but make sure the port is not used by something else. I typically use 5000 or 4000 or 3000

//Start the server
server = app.listen(port, function(err) {
    if (err) {
      throw err;
    }
    console.log("Listening on port " + port);  //I like confirmation that the server loads
});