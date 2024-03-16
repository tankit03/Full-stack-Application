// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
const bodyParser = require('body-parser');
const cors = require('cors');
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 9125;                 // Set a port number at the top so it's easy to change in the future
app.use(express.urlencoded({ extended: true })); app.use(express.json());

var db = require('./database/db-connector');  

/*
    ROUTES
*/
// app.js 

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/agents/get', (req, res) => {
    const sqlSelect = "SELECT * FROM Agents";
    db.pool.query(sqlSelect, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

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
        db.pool.query(sqlInsert, [firstName, lastName, Email, PhoneNumber, AgencyName, LicenseNumber], (error, result) => {

            if (error) {
                console.error("Error executing query:", error);
                res.status(500).send("Error executing query");
                return;
            }
            res.status(201).send("Agent inserted successfully");


        });

    });

app.delete('/api/delete/:AgentID', (req, res) => {
    const AgentID = req.params.AgentID;
    
    const sqlDelete = `DELETE FROM Agents WHERE AgentID = ?`;


    db.pool.query(sqlDelete, AgentID, (error, result) => {
        if (error) {
            // It's a good practice to handle errors, e.g., send an error response or log the error
            console.error(error);
            res.status(500).send('An error occurred');
        } else {
            res.send(result);
        }
    });
});

app.put('/api/update', (req, res) => {

    const AgentID = req.body.AgentID;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const Email = req.body.Email;
    const PhoneNumber = req.body.PhoneNumber;
    const AgencyName = req.body.AgencyName;
    const LicenseNumber = req.body.LicenseNumber;
    
    const sqlUpdate = `UPDATE Agents SET firstName = ?, lastName = ?, Email = ?, PhoneNumber = ?, AgencyName = ?, LicenseNumber = ? WHERE AgentID = ?`;

    db.pool.query(sqlUpdate, [firstName, lastName, Email, PhoneNumber, AgencyName, LicenseNumber, AgentID], (error, result) => {
        if (error) {
            // It's a good practice to handle errors, e.g., send an error response or log the error
            console.error(error);
            res.status(500).send('An error occurred');
        } else {
            const GetAgents = `SELECT * FROM Agents`;
            db.pool.query(GetAgents, (err, agents) => {

                if (err) {
                    console.error(err);
                    res.status(500).send('An error occurred');
                }
                else {
                    res.send(agents);
                }
            
            });    
            
        }
    });

});

/* ---------------------------- For Properties ------------------------------------------------------------------------------------ */

app.get('/api/properties/get', (req, res) => {
    const sqlSelect = "SELECT * FROM properties";
    db.pool.query(sqlSelect, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred while fetching properties');
        } else {
            console.log("properties",result);
            res.send(result);
            
        }
    });
});

app.post('/api/properties/insert', (req, res) => {

    const Title = req.body.Title;
    const City = req.body.City;
    const State = req.body.State;
    const Zipcode = req.body.Zipcode;
    const Price = req.body.Price;
    const Description = req.body.Description;
    const PropertyType = req.body.PropertyType;
    const Bedroom = req.body.Bedroom;
    const Bathroom = req.body.Bathroom;
    const SquareFeet = req.body.SquareFeet;
    const YearBuilt = req.body.YearBuilt;
    const RenovationDetails = req.body.RenovationDetails;
    const UniqueFeature = req.body.UniqueFeature;
    const ListingDate = req.body.ListingDate;
    const AgentID = req.body.AgentID;
    const Review_ReviewID = req.body.Review_ReviewID;

    
    const sqlInsert = `INSERT INTO properties (Title, City, State, Zipcode, Price, Description, PropertyType, Bedroom, Bathroom, SquareFeet, YearBuilt, RenovationDetails, UniqueFeature, ListingDate, AgentID, Review_ReviewID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    db.pool.query(sqlInsert, [Title, City, State, Zipcode, Price, Description, PropertyType, Bedroom, Bathroom, SquareFeet, YearBuilt, RenovationDetails, UniqueFeature, ListingDate, AgentID, Review_ReviewID], (error, results) => {
        if (error) {
            console.error("Error executing query# Find the process ID (PID)", error);
            res.status(500).send("Error executing query");
            return;
        }
        res.status(200).send("Property inserted successfully");
    }); 
});

app.delete('/api/properties/delete/:PropertyID', (req, res) => {

    const ProperyID = req.params.PropertyID;
    
    const sqlDelete = `DELETE FROM properties WHERE PropertyID = ?`;
    db.pool.query(sqlDelete, ProperyID, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        } else {
            res.send(result);
        }
    });
});

app.put('/api/properties/update', (req, res) => {

    const PropertyID = req.body.properties;
    const Title = req.body.Title;
    const City = req.body.City;
    const State = req.body.State;
    const Zipcode = req.body.Zipcode;
    const Price = req.body.Price;
    const Description = req.body.Description;
    const PropertyType = req.body.PropertyType;
    const Bedroom = req.body.Bedroom;
    const Bathroom = req.body.Bathroom;
    const SquareFeet = req.body.SquareFeet;
    const YearBuilt = req.body.YearBuilt;
    const RenovationDetails = req.body.RenovationDetails;
    const UniqueFeature = req.body.UniqueFeature;
    const ListingDate = req.body.ListingDate;
    const AgentID = req.body.AgentID;
    const Review_ReviewID = req.body.Review_ReviewID;

    const sqlUpdate = `UPDATE properties SET Title = ?, City = ?, State = ?, Zipcode = ?, Price = ?, Description = ?, PropertyType = ?, Bedroom = ?, Bathroom = ?, SquareFeet = ?, YearBuilt = ?, RenovationDetails = ?, UniqueFeature = ?, ListingDate = ?, AgentID = ?, Review_ReviewID = ? WHERE PropertyID = ?`;

    db.pool.query(sqlUpdate, [Title, City, State, Zipcode, Price, Description, PropertyType, Bedroom, Bathroom, SquareFeet, YearBuilt, RenovationDetails, UniqueFeature, ListingDate, AgentID, Review_ReviewID, PropertyID], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        } else {
            const getProperties = `SELECT * FROM properties`;
            db.pool.query(getProperties, (err, properties) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('An error occurred');
                }
                else {
                    res.send(properties);
                }
            });
        }
    });
});

/* ---------------------------- For User ------------------------------------------------------------------------------------ */

app.get('/api/users/get', (req, res) => {
    console.log('GET /api/users/get called');
    const sqlSelect = "SELECT * FROM Users";
    db.pool.query(sqlSelect, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred while fetching users');
        } else {
            console.log(result);
            res.send(result);
            
        }
    });
});

app.post('/api/users/insert', (req, res) => {

    const UserID = req.body.UserID;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const Email = req.body.Email;
    const PhoneNumber = req.body.PhoneNumber;
    const Budget = req.body.Budget;
    const PasswordHash = req.body.PasswordHash;

    const sqlInsert = `INSERT INTO Users (UserID, firstName, lastName, Email, PhoneNumber, Budget, PasswordHash) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.pool.query(sqlInsert, [UserID, firstName, lastName, Email, PhoneNumber, Budget, PasswordHash], (error, result) => {

        if (error) {
            console.error("Error executing query:", error);
            res.status(500).send("Error executing query");
            return;
        }
        res.status(201).send("User inserted successfully");
    });

});

app.delete('/api/users/delete/:UserID', (req, res) => {
    const UserID = req.params.UserID;
    
    const sqlDelete = `DELETE FROM Users WHERE UserID = ?`;
    db.pool.query(sqlDelete, UserID, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        } else {
            res.send(result);
        }
    });
});

app.put('/api/users/update', (req, res) => {

    const UserID = req.body.UserID;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const Email = req.body.Email;
    const PhoneNumber = req.body.PhoneNumber;
    const Budget = req.body.Budget;
    const PasswordHash = req.body.PasswordHash;

    const sqlUpdate = `UPDATE Users SET firstName = ?, lastName = ?, Email = ?, PhoneNumber = ?, Budget = ?, PasswordHash = ? WHERE UserID = ?`;

    db.pool.query(sqlUpdate, [firstName, lastName, Email, PhoneNumber, Budget, PasswordHash, UserID], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        } else {
            const getUsers = `SELECT * FROM Users`;
            db.pool.query(getUsers, (err, users) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('An error occurred');
                }
                else {
                    res.send(users);
                }
            });
        }
    });
});

/* ---------------------------- For Feature ------------------------------------------------------------------------------------ */

app.get('/api/feature/get', (req, res) => {
    const sqlSelect = "SELECT * FROM Properties_Features";
    db.pool.query(sqlSelect, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.post('/api/feature/insert', (req, res) => {

    const FeatureID = req.body.FeatureID;
    const Feature = req.body.Feature;

    const sqlInsert = `INSERT INTO Properties_Features (FeatureID, Feature) VALUES (?, ?)`;
    db.pool.query(sqlInsert, [FeatureID, Feature], (error, result) => {
            
            if (error) {
                console.error("Error executing query:", error);
                res.status(500).send("Error executing query");
                return;
            }
            res.status(201).send("Feature inserted successfully");
    });

});

app.delete('/api/feature/delete/:FeatureID', (req, res) => {
    const FeatureID = req.params.FeatureID;
    
    const sqlDelete = `DELETE FROM Properties_Features WHERE FeatureID = ?`;
    
    db.pool.query(sqlDelete, FeatureID, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        } else {
            res.send(result);
        }
    });
});

app.put('/api/feature/update', (req, res) => {

    const FeatureID = req.body.FeatureID;
    const Feature = req.body.Feature;

    const sqlUpdate = `UPDATE Properties_Features SET Feature = ? WHERE FeatureID = ?`;

    db.pool.query(sqlUpdate, [Feature, FeatureID], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        } else {
            const getFeatures = `SELECT * FROM Properties_Features`;
            db.pool.query(getFeatures, (err, features) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('An error occurred');
                }
                else {
                    res.send(features);
                }
            });
        }
    });
});

/* ---------------------------- For Viewings ------------------------------------------------------------------------------------ */

app.get('/api/viewing/get', (req, res) => {

    const sqlSelect = "SELECT * FROM Viewings";
    db.pool.query(sqlSelect, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.post('/api/viewing/insert', (req, res) => {

   
    const ViewingDate = req.body.ViewingDate;
    const Comment = req.body.Comments;
    const propertiesID = parseInt(req.body.PropertyID, 10);
    const userID = parseInt(req.body.UserID, 10);
    const agentID = parseInt(req.body.AgentID, 10);

    console.log(propertiesID);
    console.log(userID);
    console.log(agentID);

    console.log(req.body);
    console.log(Comment);    

    const sqlInsert = `INSERT INTO Viewings (ViewingDate, Comment, properties_PropertyID, USER_UserID, Agents_AgentID) VALUES (?, ?, ?, ?, ?)`;
    db.pool.query(sqlInsert, [ViewingDate, Comment, propertiesID, userID, agentID], (error, result) => {

        if (error) {
            console.error("Error executing query:", error);
            res.status(500).send("Error executing query");
            return;
        }
        res.status(201).send("Viewing inserted successfully");

    });

});

app.delete('/api/viewing/delete/:ViewingID', (req, res) => {
    const ViewingID = req.params.ViewingID;
    
    const sqlDelete = `DELETE FROM Viewings WHERE ViewingID = ?`;
    db.pool.query(sqlDelete, ViewingID, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        } else {
            res.send(result);
        }
    });
});

app.put('/api/viewing/update', (req, res) => {
    
        const ViewingID = req.body.ViewingID;
        const ViewingDate = req.body.ViewingDate;
        const Comments = req.body.Comments;
        const Agents_AgentID = req.body.Agents_AgentID;
        const User_userID = req.body.User_UserID;
        const Properties_propertyID = req.body.Properties_properyID;
    
        const sqlUpdate = `UPDATE Viewings SET ViewingDate = ?, Comment = ? WHERE ViewingID = ?`;

        db.pool.query(sqlUpdate, [ViewingDate, Comments, ViewingID], (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).send('An error occurred');
            } else {
                const getViewings = `SELECT * FROM Viewings`;
                db.pool.query(getViewings, (err, viewings) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('An error occurred');
                    }
                    else {
                        res.send(viewings);
                    }
                });
            }
        });
});

/* ---------------------------- For Review ------------------------------------------------------------------------------------ */


app.get('/api/review/get', (req, res) => {
    const sqlSelect = "SELECT * FROM Reviews";
    db.pool.query(sqlSelect, (err, result) => {
        if(err){
            console.error(err);
            res.status(500).send('An error occurred while fetching reviews');
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

app.delete('/api/review/delete/:ReviewID', (req, res) => {
    const ReviewID = req.params.ReviewID;
    
    const sqlDelete = `DELETE FROM Reviews WHERE ReviewID = ?`;
    db.pool.query(sqlDelete, ReviewID, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        } else {
            res.send(result);
        }
    });
});

app.post('/api/review/insert', (req, res) => {

    const Rating = req.body.Rating;
    const Comment = req.body.Comment;
    const ReviewDate = req.body.ReviewDate;
    const AgentID = parseInt(req.body.Agent_AgentID, 10);
    const PropertyID = parseInt(req.body.properties_ProperyID, 10);
    const ReviewID = parseInt(req.body.properties_Review_ReviewID, 10);
    const UserID = parseInt(req.body.Users_UserID, 10);

    console.log(req.body);
    
    const sqlInsert = `INSERT INTO Reviews (Rating, Comment, ReviewDate, Agent_AgentID, properties_PropertyID, properties_Review_ReviewID, Users_UserID) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.pool.query(sqlInsert, [Rating, Comment, ReviewDate, AgentID, PropertyID, ReviewID, UserID], (error, result) => {
        if(error){
            console.error("Error executing query:", error);
            res.status(500).send("Error executing query");
            return;
        }
        res.status(201).send("Review inserted successfully");
    });    
});

app.put('/api/review/update', (req, res) => {

    const Rating = req.body.Rating;
    const Comment = req.body.Comment;
    const ReviewDate = req.body.ReviewDate;
    const ReviewID = req.body.ReviewID;

    const sqlUpdate = `UPDATE Reviews SET Rating = ?, Comment = ?, ReviewDate = ? WHERE ReviewID = ?`;
    
    db.pool.query(sqlUpdate, [Rating, Comment, ReviewDate, ReviewID], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        } else {
            const getReviews = `SELECT * FROM Reviews`;
            db.pool.query(getReviews, (err, reviews) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('An error occurred');
                }
                else {
                    res.send(reviews);
                }
            });
        }
    });
});
/* ---------------------------- For Properties Compare ------------------------------------------------------------------------------------ */

app.get('/api/propertyCompare/get', (req, res) => {

    const sqlSelect = "SELECT * FROM Property_Feature_Comparisons";
    db.pool.query(sqlSelect, (err, result) => {
        if(err){
            console.error(err);
            res.status(500).send('An error occurred while fetching properties compare');
        }
        else {
            console.log(result);
            res.send(result);
        }
    });
});

app.delete('/api/propertyCompare/delete/:properties_PropertyID', (req, res) => {
    const PropertyID = req.params.properties_PropertyID;
    const sqlDelete = `DELETE FROM Property_Feature_Comparisons WHERE properties_PropertyID = ?`;
    db.pool.query(sqlDelete, PropertyID, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        } else {
            res.send(result);
        }
    });
});
    

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://flip1.engr.oregonstate.edu' + PORT + '; press Ctrl-C to terminate.')
});

