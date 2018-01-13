const wrapper = require('../../common/utils').asyncWrapper;

const Res = require('./res');
const _ = require('lodash');

const safeGuard = (req, slack) => {
  if (req.body.token !== slack.config.verificationToken) {
    throw new Error('Verification token is invalid');
  }
};

const parseRequest = async (req, slack, action) => {
  const webAPI = slack.webAPI;
  const slackRequest = _.extend({}, req.body);

  if (action.scopes && action.scopes.contains('users.info')) {
    const userId = slackRequest.user_id || slackRequest.user.id;
    slackRequest.userInfo = await webAPI.getUserInfo(userId);
  }

  // remove the useless fields
  delete slackRequest.token;
  delete slackRequest.response_url;
  delete slackRequest.trigger_id;

  return slackRequest;
};

module.exports = (slack, type) => {

  return wrapper(async (req, res) => {
    // validate the request
    safeGuard(req, slack);

    let name = null;
    let actions = null;
    if (type === 'command') {
      name = req.body.command;
      actions = slack.commands;
    } else {
      name = req.body.callback_id;
      actions = slack.actions;
    }

    const action = actions.get(name);

    if (!action) {
      throw new Error(`cannot get the command ${name}`);
    }

    const slackRequest = await parseRequest(req, slack, action, type);
    const slackResponse = new Res(req.body.response_url, res);

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