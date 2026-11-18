const mysql = require('mysql2');
const crypto = require("crypto");


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'root', 
    database: 'musicNotes'
  });


connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');

    connection.query(
    "CREATE TABLE IF NOT EXISTS users (" +
    "userId INT AUTO_INCREMENT PRIMARY KEY, " +
    "username VARCHAR(50) NOT NULL UNIQUE, " +
    "passwordHash VARCHAR(255) NOT NULL, " +
    "createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
  );
    connection.query(
    "CREATE TABLE IF NOT EXISTS reviews (" +
    "reviewId INT AUTO_INCREMENT PRIMARY KEY, " +
    "username VARCHAR(50) NOT NULL, " +
    "itemType VARCHAR(10) NOT NULL, " +
    "title VARCHAR(100) NOT NULL, " +
    "artist VARCHAR(100) NOT NULL, " +
    "rating INT NOT NULL, " +
    "body TEXT NOT NULL, " +
    "createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
  );
});

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return salt + ":" + hash;
}

function checkPassword(password, stored) {
  const parts = stored.split(":");
  const test = crypto.scryptSync(password, parts[0], 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(parts[1], "hex"), Buffer.from(test, "hex"));
}

var services_sql = function(app) {

    app.post('/create-account', function(req, res) {
          const username = req.body.username;
          const password = req.body.password;

          if (!username || !password) {
            return res.json({msg: "Please enter an email and password."});
          }

          connection.query("INSERT INTO users (username, passwordHash) VALUES (?, ?)",
            [username, hashPassword(password)],
            function(err) {
              if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                  return res.json({msg: "That email is already registered."});
                }
                console.log(err);
                return res.json({msg: "Something went wrong saving your account."});
              }
              console.log("New account created: " + username);
              return res.json({msg: "Account created! You can log in now."});
          });
    });

    app.post('/login', function(req, res) {
          const username = req.body.username;
          const password = req.body.password;

          if (!username || !password) {
            return res.json({msg: "Please enter an email and password."});
          }

          connection.query("SELECT * FROM users WHERE username = ?",
            [username],
            function(err, rows) {
              if (err) {
                console.log(err);
                return res.json({msg: "Something went wrong."});
              }
              if (rows.length === 0 || !checkPassword(password, rows[0].passwordHash)) {
                return res.json({msg: "Wrong email or password."});
              }
              return res.json({msg: "Welcome back, " + rows[0].username + "!", success: true, username: rows[0].username});
          });
    });
    
        
    app.post('/create-review', function(req, res) {
          const username = req.body.username;
          const itemType = req.body.itemType;
          const title = req.body.title;
          const artist = req.body.artist;
          const rating = parseInt(req.body.rating, 10);
          const body = req.body.body;

          if (!username || !title || !artist || !body) {
            return res.json({msg: "Please fill in every field."});
          }
          if (itemType !== "Song" && itemType !== "Album") {
            return res.json({msg: "Invalid type."});
          }
          if (!(rating >= 1 && rating <= 5)) {
            return res.json({msg: "Rating must be 1 to 5."});
          }

          connection.query(
            "INSERT INTO reviews (username, itemType, title, artist, rating, body) VALUES (?, ?, ?, ?, ?, ?)",
            [username, itemType, title, artist, rating, body],
            function(err) {
              if (err) {
                console.log(err);
                return res.json({msg: "Something went wrong saving your review."});
              }
              console.log("New review by " + username + ": " + title);
              return res.json({msg: "Review posted!", success: true});
          });
    });

    app.get('/user-reviews', function(req, res) {
          const username = req.query.username;

          connection.query(
            "SELECT * FROM reviews WHERE username = ? ORDER BY createdAt DESC",
            [username],
            function(err, rows) {
              if (err) {
                console.log(err);
                return res.json({msg: "Something went wrong.", reviews: []});
              }
              return res.json({reviews: rows});
          });
    });

}

module.exports = services_sql;