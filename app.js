var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// --------- INTIALIZE SOME GLOBALS ------------- //
global.myAppVars = {};
if (process.env.FORCE_ADMIN == "true") {
  global.myAppVars.admin == true;
  console.log('Forcing Adming Mode!');
}
else {
  global.myAppVars.admin == false;
  console.log('Starting in Volunteer Mode');
}

if (process.env.NODE_ENV === 'production') {
  global.myAppVars.server = process.env.APP_URL;
}
else {
  global.myAppVars.server = "http://localhost:3000";
}

// Set auto email configuration
global.myAppVars.TWN_GOOGLE_CLIENT_ID = process.env.TWN_GOOGLE_CLIENT_ID;
global.myAppVars.TWN_GOOGLE_CLIENT_SECRET = process.env.TWN_GOOGLE_CLIENT_SECRET;
global.myAppVars.TWN_GOOGLE_REFRESH_TOKEN = process.env.TWN_GOOGLE_REFRESH_TOKEN;
global.myAppVars.TWN_GOOGLE_ACCESS_TOKEN = process.env.TWN_GOOGLE_ACCESS_TOKEN;
global.myAppVars.TWN_EMAIL_ADMIN = process.env.TWN_EMAIL_ADMIN;
global.myAppVars.TWN_EMAIL_BOT = process.env.TWN_EMAIL_BOT;
global.myAppVars.TWN_EMAIL_BOT_USERNAME = global.myAppVars.TWN_EMAIL_BOT.substring(0, global.myAppVars.TWN_EMAIL_BOT.lastIndexOf("@"));
global.myAppVars.TWN_EMAIL_DEVELOPER = process.env.TWN_EMAIL_DEVELOPER;

// console.log("global.myAppVars.TWN_EMAIL_BOT_USERNAME: ", global.myAppVars.TWN_EMAIL_BOT_USERNAME);
// console.log("global.myAppVars: ", global.myAppVars);

// -------- END INTIALIZE SOME GLOBALS ------------- //


require('./app_api/models/db');

var routes = require('./app_server/routes/index');
var routes_api = require('./app_api/routes/index');
var users = require('./app_server/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', routes_api);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




// ----------- CONFIGURE APPLICATION ------------- //

// Custom app config variable
global.myAppConfig = {};

// Initial app configuration
var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = process.env.APP_URL;
}

var requestOptions, path;
path = '/api/config';
requestOptions = {
  url: apiOptions.server + path,
  method: "GET",
  json: {},
  qs: {
    // query string
  }
};

console.log('requestOptions.url: ', requestOptions.url);

request(
  requestOptions,
  function(err, response, config) {

    console.log('---callback: app_server received response from API call');
    if (err) {
      console.log('err:', err);
    }

    // console.log('config: ', config);
    // console.log('Before storing: global.my_app_config: ', global.my_app_config);

    // Configure the app (store in globals)
    global.myAppConfig.opportunityCategories = config.opportunityCategories;
    global.myAppConfig.timesOfDay = config.timesOfDay;
    global.myAppConfig.howOftens = config.howOftens;
    global.myAppConfig.languages = config.languages;
    global.myAppConfig.hearAbouts = config.hearAbouts;
    global.myAppConfig.affiliations = config.affiliations;

    console.log('After storing: global.myAppConfig: ', global.myAppConfig);
    console.log('Intial app configuration complete!');
    // console.log('global.myAppConfig: ', global.myAppConfig);
  }
);






module.exports = app;
