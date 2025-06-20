const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const app = express();
app.use(session({
    secret: 'Bhavika Mehta’,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false
    }
  }));




// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const dogsRoutes = require('./routes/dogsRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dogs', dogsRoutes);

// Export the app instead of listening here
module.exports = app;