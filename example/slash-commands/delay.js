const slack = require('../slack-framework');
const commands = slack.commands;

const command = commands.addCommand({
  name: '/delay',
  handler: (req, res, next) => {
    setTimeout(() => {
      const message = res.createMessage('this is a delay message!');
      res.send(message);
    }, 15000);
  },
  helpText: 'balba',
  responseType: 'in_channel'
});


module.exports = command;