const path = require("path"); 

var router = function(app) {

    app.get('/', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/musicnotes.html"));
    })

    app.get('/login-musicnotes', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/login-musicnotes.html"));
    })

    app.get('/create-musicnotes', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/create-musicnotes.html"));
    })
    app.get('/home', function(req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../client/home.html"));
    })

    app.get('/review', function(req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../client/review.html"));
    })

    app.get('/profile', function(req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../client/profile.html"));
    })
};

module.exports = router; 