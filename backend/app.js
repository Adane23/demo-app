//import the express module
const express = require('express');

// Import the mysql module  
const mysql = require('mysql2');

//Create the express app 
const app = express();
//use nodemon to run the app on the terminal: nodemon app.js

// Define the connection parameters for the database 
const dbConfig = {
    connectionLimit: 10,
    //socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
    password: "demo-app2", //demo-app AbeGaragePMA
    user: "demo-app2",
    host: "127.0.0.1",//"localhost"
    //host: "localhost",//"127.0.0.1" 
    database: "demo-app"
} 

// Create the connection to the database 
const connection = mysql.createConnection(dbConfig);

// Connect to the database 
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
});

//use the express.json() middleware to parse the request body 
app.use(express.json());


// Allow CORS for all requests
app.use((req, res, next) =>  {
    // Allow all origins
    res.setHeader("Access-Control-Allow-Origin", '*');
    
    // Specify the methods allowed when accessing the  resource
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    
    // Allow headers including Content-Type and Authorization for the requests 
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    // Pass to next layer of middleware
    next();
});

// Create a simple get request handler to send a response back 
app.get("/", (req, res) => {
    res.send("Testing")}    
);


// Post request handler to add a new employee to the database
app.post("/add-employee", (req, res) => {
    console.log(req.body);
    //Write the SQL query to add to the database table named employee_test
    const sql = `INSERT INTO employee_test (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;

    // Parameters to avoid SQL injection
    const params = [req.body.first_name, req.body.last_name, req.body.email, req.body.password];

    // Execute the SQL query
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.error("Error inserting record:", err);
            return res.status(500).json({ status: 'error', message: 'An error occurred while adding the employee' });
        }
        console.log("1 record inserted successfully");
        // Send a response back to the client
        res.status(200).json({ status: 'success', message: 'Employee added successfully' });
    });
});   


// Post request handler to log in an employee which comes to this /login 
app.post('/login', (req, res) => {
    console.log(req.body);
    // Write the SQL query to retrieve the employee with the email and password provided by the user and compare it with the data in the database
    const sql = `SELECT * FROM employee_test WHERE email = ? AND password = ?`;

    // Parameters to avoid SQL injection
    const params = [req.body.email, req.body.password];

    // Execute the query
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.error("Error fetching user:", err);
            return res.status(500).json({ status: 'error', message: 'An error occurred during login' });
        }
        console.log(result);
        // Check if the result is empty or not
        if (result.length > 0) {
            // Send a response back to the client
            res.status(200).json({ status: 'success', message: 'Login successful' });
        } else {
            // Send a response back to the client
            res.status(401).json({ status: 'failure', message: 'Login failed' });
        }
    });
});


// Set up the port to listen to 
const port = 4000;

// Set up the listener 
app.listen(port, () => console.log(`listening on port ${port}`)); 
