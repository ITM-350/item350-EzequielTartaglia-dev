const express = require('express'); 

// Create an instance of the Express application
const app = express();  

// Serve static files from the root directory
app.use(express.static(__dirname + '/'));

// Define a GET route for the root ('/')
app.get('/', (req, res) => {
  res.send('Server connected, successfully!');
});

// Start the server on port 8080
app.listen(8080, () => {
  console.log('Server listening on port 8080...');
});
