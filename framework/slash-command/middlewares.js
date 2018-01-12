const Res = require('./res');
const Promise = require('bluebird');

const validate = (req, slashCommand) => {
  const token = slashCommand.slack.config.token;
  const requestToken = req.body.token;
  if (token !== requestToken) {
    throw new Error('token invalid');
  }
};

const getUserProfile = (userId, slack) => {

};


module.exports = (slashCommand) => {
  let cmd = null;
  return (req, res, next) => {
    validate(req).then(() => {
      // find the command
      cmd = slashCommand.commands[req.body.command];
      if (!cmd) {
        const err = new Error('cannot find the cmd: ' + req.body.command);
        err.status = 404;
        throw err;
      }

      const slashReq = {};
      if (cmd.scopes.contains('profile')) {
        return getUserProfile(req.body.userId, slashCommand.slack).then((profile) => {
          slashReq.profile = profile;
          return slashReq;
        });
      }
      return slashReq;

    }).then((slashReq) => {
      const slashRes = Res(res);
      const next = Next(slashReq, slashRes);
      cmd.handler(slashReq, slashRes, next.next.bind(next));
      Promise.delay(3).then(() => {
        if (!slashRes.sent) {
          slashRes.sendTempResponse();
        }
      })
    }).catch((err) => {
      next(err);
    });
  };
};