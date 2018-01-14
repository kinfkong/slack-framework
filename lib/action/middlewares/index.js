const _ = require('lodash');
const logger = require('../../common/logger');
const wrapper = require('../../common/utils').asyncWrapper;
const Res = require('./res');

const safeGuard = (req, slack) => {
  const requestToken = req.token || req.payload.token;
  if (requestToken !== slack.config.verificationToken) {
    throw new Error(`Verification token is invalid ${requestToken} ${slack.config.verificationToken}`);
  }
};

const parseRequest = async (req, slack, action, type) => {
  const webAPI = slack.webAPI;
  const slackRequest = _.assignIn({}, type === 'command' ? req : req.payload);

  if (type === 'action') {
    if (slackRequest.actions && slackRequest.actions.length > 0) {
      slackRequest.target = slackRequest.actions[0];
    } else {
      slackRequest.target = null;
    }
  }
  if (_.includes(action.scopes, 'users:read') >= 0) {
    const userId = slackRequest.user_id || slackRequest.user.id;
    slackRequest.userInfo = await webAPI.getUserInfo(userId);
  }

  return slackRequest;
};

module.exports = (slack, type) =>
  wrapper(async (req, res) => {
    // validate the request
    if (type === 'action') {
      req.body.payload = JSON.parse(req.body.payload);
    }
    safeGuard(req.body, slack);

    let name = null;
    let actions = null;
    if (type === 'command') {
      name = req.body.command;
      actions = slack.commands;
    } else {
      name = req.body.payload.callback_id;
      actions = slack.actions;
    }

    const action = actions.get(name);

    if (!action) {
      throw new Error(`cannot get the command ${name}`);
    }

    const slackRequest = await parseRequest(req.body, slack, action, type);
    const slackResponse = new Res(action, slackRequest.response_url, res);

    logger.debug(JSON.stringify(slackRequest, null, 2)); // eslint-disable-line no-magic-numbers

    // delegate to custom handler
    if (type === 'command' && slackRequest.text && slackRequest.text.toLowerCase() === 'help') {
      logger.debug(JSON.stringify(slackRequest));
      action.helpHandler(slackRequest, slackResponse);
    } else {
      action.handler(slackRequest, slackResponse);
    }
    setTimeout(() => {
      if (!slackResponse.sent) {
        slackResponse._sendTempResponse();
      }
    }, slack.config.immediateMessageTimeoutLimit);
  });

