// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
const bodyParser = require('body-parser');
const cors = require('cors');
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 9124;                 // Set a port number at the top so it's easy to change in the future

var db = require('./database/db-connector');  

/*
    ROUTES
*/
// app.js 

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM Agents";
    db.pool.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

// app.get('/', function(req, res)
//     {
//         // Define our queries
//         query1 = 'DROP TABLE IF EXISTS diagnostic;';
//         query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
//         query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
//         query4 = 'SELECT * FROM diagnostic;';

//         // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

//         // DROP TABLE...
//         db.pool.query(query1, function (err, results, fields){

//             // CREATE TABLE...
//             db.pool.query(query2, function(err, results, fields){

//                 // INSERT INTO...
//                 db.pool.query(query3, function(err, results, fields){

//                     // SELECT *...
//                     db.pool.query(query4, function(err, results, fields){

//                         // Send the results to the browser
//                         res.send(JSON.stringify(results));
//                     });
//                 });
//             });
//         });
//     });
    app.get('/', function(req, res) {
        const sqlInsert = `INSERT INTO Agents (firstName, lastName, Email, PhoneNumber, AgencyName, LicenseNumber) VALUES ('tanish', 'smith', 'cool@gmail.com', 1234567890, 'cool', 1234567890)`;
        db.pool.query(sqlInsert, (error, result) => {
            if (error) {
                // It's a good practice to handle errors, e.g., send an error response or log the error
                console.error(error);
                res.status(500).send('An error occurred');
            } else {
                res.send(result);
            }
        });
    });

    app.post('/api/insert', (req, res) => {

        
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const Email = req.body.Email;
        const PhoneNumber = req.body.PhoneNumber;
        const AgencyName = req.body.AgencyName;
        const LicenseNumber = req.body.LicenseNumber;


        const sqlInsert = `INSERT INTO Agents (firstName, lastName, Email, PhoneNumber, AgencyName, LicenseNumber) VALUES (?, ?, ?, ?, ?, ?)`;
        db.pool.query(sqlInsert, [firstName, lastName, Email, PhoneNumber, AgencyName, LicenseNumber], (error, result) => {});
            


    });


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
