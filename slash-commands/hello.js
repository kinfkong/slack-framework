const slack = require('node-slack');
const slashCommand = slack.slashCommand;

const command = slashCommand.define({
  name: '/hello',
  handler: (req, res, next) => {
    const message = res.createMessage('Hello World!');
    res.send(message);
  },
  helpText: 'balba'
});


module.exports = command;