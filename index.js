const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from public directory
app.use(express.static('public'));

// Root endpoint
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// API endpoint for /api
app.get('/api', function(req, res) {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// API endpoint for /api/:date
app.get('/api/:date', function(req, res) {
  let dateParam = req.params.date;
  let date;

  // Check if dateParam is a Unix timestamp (all numbers)
  if (/^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  // Check if date is valid
  if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
    return;
  }

  // Return both unix and utc formats
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Get port from environment variable
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Your app is listening on port ${port}`);
});

// Export the Express API
module.exports = app;