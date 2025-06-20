const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();


var session = require('express-session'); // THIS CODE //
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ // //
secret: ‘a string of your choice’, // //
resave: false, // THIS CODE //
saveUninitialized: true, // //
cookie: { secure: false } // //
})); // //
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
module.exports = app;



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