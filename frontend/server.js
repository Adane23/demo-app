// Import express and path modules
const express = require('express');
const path = require('path');

// Create an express app
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Redirect every request to index.html
app.get('*', (req, res) => { // Corrected the arrow function syntax here
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Listen on the default port 80
app.listen(80, () => {
    console.log('Server is running on port 80');
});
