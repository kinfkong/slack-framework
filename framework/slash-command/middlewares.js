const wrapper = require('../common/utils').asyncWrapper;
const Res = require('./res');

const safeGuard = (req, slashCommand) => {

};

const parseReq = async (req, slashCommand) => {

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
    cmd.handler(slashReq, slashRes, slashNext);


    setTimeout(() => {
      if (!slashRes.sent) {
        slashRes._sendTempResponse();
      }
    }, slashCommand.slack.slashCommandImmediateTimeoutLimit);
  });
};