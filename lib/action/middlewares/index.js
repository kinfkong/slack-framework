const wrapper = require('../../common/utils').asyncWrapper;

const Res = require('./res');
const _ = require('lodash');

const safeGuard = (req, slack) => {
  const requestToken = req.token || req.payload.token;
  if (requestToken !== slack.config.verificationToken) {
    throw new Error(`Verification token is invalid ${requestToken} ${slack.config.verificationToken}`);
  }
};

const parseRequest = async (req, slack, action, type) => {
  const webAPI = slack.webAPI;
  const slackRequest = _.extend({}, type === 'command' ? req : req.payload);

  if (type === 'action') {
    if (slackRequest.actions && slackRequest.actions.length > 0) {
      slackRequest.target = slackRequest.actions[0];
    } else {
      slackRequest.target = null;
    }
  }
  if (action.scopes && action.scopes.contains('users.info')) {
    const userId = slackRequest.user_id || slackRequest.user.id;
    slackRequest.userInfo = await webAPI.getUserInfo(userId);
  }

  return slackRequest;
};

module.exports = (slack, type) => {

  return wrapper(async (req, res) => {
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

    // delegate to custom handler
    if (type === 'command' && slackRequest.text && slackRequest.text.toLowerCase() === 'help') {
      action.helpHandler(slackRequest, slackResponse);
    } else {
      action.handler(slackRequest, slackResponse);
    }
    setTimeout(() => {
      if (!slackResponse.sent) {
        slackResponse._sendTempResponse();
      }
    }, slack.immediateMessageTimeoutLimit || 2000);
  });
};