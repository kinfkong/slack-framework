const slack = require('node-slack');
const slashCommand = slack.slashCommand;

const command = slashCommand.define({
  name: '/show-button',
  handler: (req, res, next) => {
    const message = res.createMessage('This is a message!');
    const attachment = message.addAttachment('This is an attachment.');
    res.send(message);
  },
  helpText: 'balba'
});


module.exports = command;