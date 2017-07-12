let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');

let index = require('./routes/index');
let users = require('./routes/users');
let campaigns = require('./routes/campaigns');

let app = express();

let config = require('./config/config.json');
require('./models/main').connect(config.mongoDbUri)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/', index);
app.use('/users', users);
app.use('/api', campaigns);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
