/*
 * Copyright (c) 2018 TopCoder, Inc. All rights reserved.
 */

/**
 * This module is showing the demo 'Hello World' command for showing how to use a button and button action handler.
 *
 * @author TCSCODER
 * @version 1.0
 */

const slack = require('../slack-framework');

const commands = slack.commands;
const actions = slack.actions;
const action = actions.addAction({
  name: 'hello-button-handler',
  handler: (req, res) => {
    let message = null;
    if (req.target.value === 'button1') {
      message = res.createMessage('Happy to hear that you like it.');
    } else {
      message = res.createMessage('Sorry to hear that.');
    }
    res.send(message);
  },
});

const command = commands.addCommand({
  // the name of the command
  name: '/hello-with-button',

  // the slash command handler
  handler: (req, res) => {
    const message = res.createMessage(`Hello ${req.user_name}!`);
    const attachment = message.addAttachment('Do you like this command? ');
    attachment.setAction(action);
    attachment.addButton({text: 'I like it!', value: 'button1', name: 'button'});
    const btn2 = attachment.addButton({text: 'I don\'t like it!', value: 'button2', name: 'button'});
    btn2.assignIn({style: 'danger'});
    res.send(message);
  },
});


module.exports = command;
