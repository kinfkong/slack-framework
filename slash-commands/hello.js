const slack = require('node-slack');
const commands = slack.commands;

const command = commands.addCommand({
  name: '/hello',
  handler: (req, res, next) => {
    const message = res.createMessage('Hello World!');
    res.send(message);
  },
  helpText: 'balba'
});


module.exports = command;