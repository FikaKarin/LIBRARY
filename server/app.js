var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var booksRouter = require('./routes/books');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());


//***START TESTING ***//

/**
 * All testing of error/validation and failure messeges
 */

//testing failure message 
// app.use(function(req, res, next) {
//   setTimeout(next, 5000);
// });

//testing log errormessage 500 status
// app.use(function(req, res, next) {
//   res.sendStatus(500);
// });


//testing error at delete-function
// app.use(function(req, res, next) {
//   setTimeout(next, 1000);
// });

//testing if request method is DELETE, send response with error-message 500. Esle, go to next rendering.
// app.use(function (req, res, next) {
//   if (req.method === ’DELETE’) {
//      res.sendStatus(500);
//   } 
//   else {
//   next();}
// });

// *** END TESTING ***//

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({ 'error': err.toString() });
});

module.exports = app;
