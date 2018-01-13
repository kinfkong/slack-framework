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

const menuAction = actions.addAction({
  name: 'test-menus',
  handler: (req, res) => {
    const target = req.target;
    const message = res.createMessage();
    if (target.selected_options[0] === 'option1') {
      message.addText('You are selecting option #1');
    } else {
      message.addText('You are selecting option #2');
    }
    res.send(message);
  }
});

const command = commands.addCommand({
  name: '/show-button',

  handler: (req, res) => {
    const message = res.createMessage('This is a message!');
    const attachment = message.addAttachment('This is an attachment.');

    attachment.setAction(action);

    const button1 = attachment.addButton({name: 'test-button', text: 'Button #1', value: 'button1'});
    const button2 = attachment.addButton({name: 'test-button', text: 'Button #2', value: 'button2'});
    button1.extend({style: 'danger'});

    const selectOptions = [
      {text: 'option #1', value: 'option1'},
      {text: 'option #2', value: 'option2'}
    ];

    const menuAttachment = message.addAttachment('This for menu.');
    menuAttachment.setAction(menuAction);
    menuAttachment.addMenu({name: 'test-menu', text: 'which to select', selectOptions});

    res.send(message);
  },
  helpText: 'balba'
});


module.exports = command;