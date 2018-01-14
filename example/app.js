const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('config');
const morganLogger = require('morgan');

const logger = require('./common/logger');
const slack = require('./slack-framework');

const app = express();

const commands = slack.commands;
const actions = slack.actions;

slack.set('clientID', config.get('SLACK_APP_CLIENT_ID'));
slack.set('clientSecret', config.get('SLACK_APP_CLIENT_SECRET'));
slack.set('verificationToken', config.get('SLACK_APP_VERIFICATION_TOKEN'));
slack.set('oauthAccessToken', config.get('SLACK_APP_OAUTH_ACCESS_TOKEN'));
slack.set('immediateMessageTimeoutLimit', config.get('SLACK_APP_IMMEDIATE_MESSAGE_TIMEOUT_LIMIT'));
slack.set('logLevel', 'debug');

commands.loadCommands(path.join(__dirname, './slash-commands'));

app.use(morganLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/commands', commands.middlewares);
app.use('/actions', actions.middlewares);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  logger.logFullError(err, 'ErrorHandler');
  // render the error page
  res.status(err.status || 500); // eslint-disable-line no-magic-numbers
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

module.exports = app;
