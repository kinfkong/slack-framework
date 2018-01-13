var express = require('express');
var path = require('path');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const config = require('config');

var app = express();


const slack = require('./slack-framework');
const commands = slack.commands;
const actions = slack.actions;

slack.config = {
  clientID: config.get('SLACK_APP_CLIENT_ID'),
  clientSecret: config.get('SLACK_APP_CLIENT_SECRET'),
  verificationToken: config.get('SLACK_APP_VERIFICATION_TOKEN'),
  oauthAccessToken: config.get('SLACK_APP_OAUTH_ACCESS_TOKEN'),

  immediateMessageTimeoutLimit: config.get('SLACK_APP_IMMEDIATE_MESSAGE_TIMEOUT_LIMIT')
};

require('./slash-commands');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/commands', commands.middlewares);
app.use('/actions', actions.middlewares);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err);
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
