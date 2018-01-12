const wrapper = require('../common/utils').asyncWrapper;
const Res = require('./res');
const _ = require('lodash');

const safeGuard = (req, slashCommand) => {

};

const parseReq = async (req, slashCommand) => {
  const slashReq = _.extend({}, req.body);
  return slashReq;
};

module.exports = (slashCommand) => {

  return wrapper(async (req, res) => {
    // validate the request
    safeGuard(req);

    const commandName = req.body.command;
    const cmd = slashCommand.get(commandName);

    if (!cmd) {
      throw new Error(`cannot get the command ${commandName}`);
    }

    const slashReq = await parseReq(req, slashCommand);
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