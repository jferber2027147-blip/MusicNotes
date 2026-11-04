//This file handles the database calls for the MySQL server

const mysql = require('mysql2');  //Import the driver

//Define the connection.
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  //If not using root, replace with your user.
    password: 'root',  //Replace with your SQL password
    database: 'musicNotes'
  });

  //Create a connection
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});

//Note that all the listeners go into this one function.  This function is exported.
var services_sql = function(app) {
    //CRUD Types:
      //post - when doing an INSERT
      //get - when doing a SELECT
      //put - when doing an UPDATE
      //delete - when doing a DELETE

    //Notes:
      //1. A listener is a unique combination of the CRUD type and the /{listener name}
      //2. For the add record, you would call is using localhost:5000/write-record
      //3. If you put two listeners with the same CRUD/name combination, the last one created would prevail


  //Add a record
    app.post('/write-record', function(req, res) {
        console.log('In MySQL Write Record');

        var data = {
            bookTitle: req.body.bookTitle, 
            author: req.body.author, 
            publisher: req.body.publisher, 
            yearPublished: req.body.yearPublished, 
            isbn: req.body.isbn
        };

        //Execute the query
          connection.query("INSERT INTO books SET ?", data, function(err, results) {
              if(err) {
                return res.json({msg:"Error: " + err});
              } else {
                console.log("Inserted new record");
                // connection.end();
                return res.status(201).send(JSON.stringify({msg:"SUCCESS"}));
              }
          });
          
    });

    //Get all the records
    app.get('/read-records', function(req, res) {
          connection.query("SELECT * FROM books", function(err, rows) {
              if(err) {
                return res.json({msg:"Error: " + err});

              } else {
                console.log("Read Records");
                // connection.end();
                return res.status(201).send(JSON.stringify({msg:"SUCCESS", books:rows}));
              }
          });    
    });

    //Delete a record
    app.delete('/delete-record', function(req, res) {
        //Bring in the data from the client
        var bookId = req.body.deleteID;

        //Create delete SQL string
        var queryString = "DELETE FROM books WHERE bookId = " + bookId;

        //Execute Delete
        connection.query(queryString, function(err, rows) {
            if(err) {
                return res.json({msg:"Error: " + err});
            } else {
                // console.log("Delete Records");
                return res.status(201).send(JSON.stringify({msg:"SUCCESS"}));
            }
        });    
    });
}

module.exports = services_sql;  //Exports the function (note it is imported in app.js)