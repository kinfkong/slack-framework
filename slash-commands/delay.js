const slack = require('node-slack');
const commands = slack.commands;

const command = commands.addCommand({
  name: '/delay',
  handler: (req, res, next) => {
    setTimeout(() => {
      const message = res.createMessage('this is a delay message!');
      res.send(message);
    }, 15000);
  },
  helpText: 'balba'
});


module.exports = command;