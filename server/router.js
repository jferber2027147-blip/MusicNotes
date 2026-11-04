//This file creates the routes for each page.
//If you are using REACT, you will most likely not need this.

const path = require("path"); //For directory references

//Page listeners
var router = function(app) {
    //Note the common format for each page.

    app.get('/', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/write-library.html"));
    })

    app.get('/write-library', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/write-library.html"));
    })

    app.get('/browse-library', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/browse-library.html"));
    })

};

module.exports = router;  //Exports the function (note it is imported in app.js)