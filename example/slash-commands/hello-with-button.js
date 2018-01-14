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

// defines an action handler
const action = actions.addAction({
  // the name of action handler, should be globally unique
  name: 'hello-button-handler',

  // the action handler, similar to the command handler
  handler: (req, res) => {
    // req has the following fields
    // - target (the button that click or the menu option that selected)
    // - team
    // - channel
    // - user
    // - userInfo (only present when scopes: ['users:read'] is configured.)
    // ---- id
    // ---- team_id
    // ---- name
    // ---- real_name
    // ---- is_admin
    // ---- is_owner
    // ---- is_primary_owner
    // ---- is_bot
    // ---- is_app_user
    let message = null;
    if (req.target.value === 'button1') {
      message = res.createMessage('Happy to hear that you like it.');
    } else {
      message = res.createMessage('Sorry to hear that.');
    }
    res.send(message);
  },
  
  // optional, if scope 'users:read' is set, it will get the userInfo via slack API.
  scopes: ['users:read'],

  // optional. it can be 'in_channel' or 'ephemeral'. default: 'ephemeral'.
  // 'ephemeral' sends the message only for the user executing the command, while 'in_channel' sends the message
  // to all the users in the channel.
  // in the message, you can use message.setResponseType(...); to override this setting.
  responseType: 'ephemeral',
});

const command = commands.addCommand({
  // the name of the command
  name: '/hello-with-button',

  // the slash command handler
  handler: (req, res) => {
    const message = res.createMessage(`Hello ${req.user_name}!`);
    const attachment = message.addAttachment('Do you like this command? ');

    // sets the action handler for the attachment
    attachment.setAction(action);

    // create the buttons
    attachment.addButton({text: 'I like it!', value: 'button1', name: 'button'});
    const btn2 = attachment.addButton({text: 'I don\'t like it!', value: 'button2', name: 'button'});

    // you can set other options if needed
    btn2.assignIn({style: 'danger'});

    res.send(message);
  },
});


module.exports = command;
