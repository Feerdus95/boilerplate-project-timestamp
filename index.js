const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Root endpoint
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API endpoint for /api
app.get('/api', function (req, res) {
  res.json({ 
    unix: new Date().getTime(),
    utc: new Date().toUTCString() 
  });
});

// API endpoint for /api/:date
app.get('/api/:date', function (req, res) {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    date = new Date();
  } else if (/^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});