var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(cors()) // <--- CORS

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
app.use('/api/users', users); // <-- note we're calling this API

// In production, we'll actually serve our angular app from express
if (app.get('env') === 'production') {
  app.use(express.static(path.join(__dirname, '/dist')));

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

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
	// debug('Express server listening on port ' + server.address().port);
   	console.log('myApp server listening on port ' + app.get('port'));
});

module.exports = app;
