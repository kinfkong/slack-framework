const slack = require('node-slack');
const commands = slack.commands;
const actions = slack.actions;

const action = actions.addAction({
  name: 'test-buttons',
  handler: (req, res) => {
    const target = req.target;
    const message = res.createMessage();
    if (target.value === 'button1') {
      message.addText('You are clicking button #1');
    } else {
      message.addText('You are clicking button #2');
    }
    res.send(message);
  }
});

const command = commands.addCommand({
  name: '/show-button',
  handler: (req, res) => {
    const message = res.createMessage('This is a message!');
    const attachment = message.addAttachment('This is an attachment.');

    attachment.actionHandler = action;

    const button1 = attachment.addButton({name: 'test-button', text: 'Button #1', value: 'button1'});
    const button2 = attachment.addButton({name: 'test-button', text: 'Button #2', value: 'button2'});

    button1.extend({style: 'danger'});

    res.send(message);
  },
  helpText: 'balba'
});


module.exports = command;