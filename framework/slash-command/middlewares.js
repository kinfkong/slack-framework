const wrapper = require('../common/utils').asyncWrapper;

const Res = require('./res');
const _ = require('lodash');

const safeGuard = (req, slashCommand) => {
  if (req.body.token !== slashCommand.slack.config.verificationToken) {
    throw new Error('Verification token is invalid');
  }
};

const parseReq = async (req, slashCommand) => {
  const webAPI = slashCommand.slack.webAPI;
  const slashReq = _.extend({}, req.body);
  slashReq.userInfo = await webAPI.getUserInfo(slashReq.user_id);

  // remove the useless fields
  delete slashReq.token;
  delete slashReq.response_url;
  delete slashReq.trigger_id;

  return slashReq;
};

module.exports = (slashCommand) => {

  return wrapper(async (req, res) => {
    // validate the request
    safeGuard(req, slashCommand);

    const commandName = req.body.command;
    const cmd = slashCommand.get(commandName);

    if (!cmd) {
      throw new Error(`cannot get the command ${commandName}`);
    }

    const slashReq = await parseReq(req, slashCommand, cmd);
    const slashRes = new Res(req.body.response_url, res);
    const slashNext = null; // TODO

    // delegate to custom handler
    if (slashReq.text && slashReq.text.toLowerCase() === 'help') {
      cmd.helpHandler(slashReq, slashRes, slashNext);
    } else {
      cmd.handler(slashReq, slashRes, slashNext);
    }
    setTimeout(() => {
      if (!slashRes.sent) {
        slashRes._sendTempResponse();
      }
    }, slashCommand.slack.slashCommandImmediateTimeoutLimit || 2000);
  });
};