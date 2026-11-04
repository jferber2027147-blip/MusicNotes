//This file creates the routes for each page.
//If you are using REACT, you will most likely not need this.

const path = require("path"); //For directory references

//Page listeners
var router = function(app) {
    //Note the common format for each page.

    app.get('/', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/musicnotes.html"));
    })

    app.get('/login-musicnotes', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/login-musicnotes.html"));
    })

    app.get('/create-musicnotes', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/create-musicnotes.html"));
    })

};

module.exports = router;  //Exports the function (note it is imported in app.js)