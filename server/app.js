var express = require('express');
var router = express.Router();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')

var index = require('./routes/index');
var users = require('./routes/users');
var feed = require('./routes/feed');

var app = express();

app.use(cors()) // <--- CORS

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
app.use('/api/users', users); // <-- note we're calling this API
app.use('/api/feed', feed);


// In production, we'll actually serve our angular app from express
if (app.get('env') === 'production') {
  app.use(express.static(path.join(__dirname, '/dist')));

  // rewrite virtual urls to angular app to enable refreshing of internal pages
  app.use('*', function (req, res, next) {
      res.sendFile(path.resolve('dist/index.html'));
  });

// production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

module.exports = app;
