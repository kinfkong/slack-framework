const slack = require('node-slack');
const slashCommand = slack.slashCommand;

const command = slashCommand.define({
  name: '/show-button',
  handler: (req, res, next) => {
    const message = res.createMessage('This is a message!');
    const attachment = message.addAttachment('This is an attachment.');

    attachment.set('callback_id', 'test-buttons');

    const button1 = attachment.addButton({name: 'test-button', text: 'Button #1', value: 'button1'});
    const button2 = attachment.addButton({name: 'test-button', text: 'Button #2', value: 'button2'});

    button1.extend({style: 'danger'});

    res.send(message);
  },
  helpText: 'balba'
});


module.exports = command;