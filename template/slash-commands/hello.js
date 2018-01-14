/*
 * Copyright (c) 2018 TopCoder, Inc. All rights reserved.
 */

/**
 * This module is showing the demo 'Hello World' command.
 *
 * @author TCSCODER
 * @version 1.0
 */

const slack = require('../slack-framework');

const commands = slack.commands;

const command = commands.addCommand({
  // the name of the command
  // This name should be the same name as you configured in the Slash Command, including the '/' character.
  name: '/hello',

  // the slash command handler
  handler: (req, res) => {
    // req has the following fields
    // - team_id
    // - team_domain
    // - channel_id
    // - user_id
    // - user_name
    // - command
    // - text
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
    const message = res.createMessage(`Hello World! Welcome ${req.user_name}!`);
    res.send(message);

    // for more complicated message, you can view the README.md or the example/slash-commands
  },

  // optional, if scope 'users:read' is set, it will get the userInfo via slack API.
  scopes: ['users:read'],

  // optional. it can be 'in_channel' or 'ephemeral'. default: 'ephemeral'.
  // 'ephemeral' sends the message only for the user executing the command, while 'in_channel' sends the message
  // to all the users in the channel.
  // in the message, you can use message.setResponseType(...); to override this setting.
  responseType: 'in_channel',

  // optional. this text will display when calling: /<command-name> help
  // You should use either helpText or helpHandler.
  // if helpText and helpHandler is not set, the help action will not be functioned.
  // Note: the property will be ignored if helpHandler is also set.
  helpText: 'This command is a hello world demo.',

  // optional. this handler let's you to define a more complicated help message to replace helpText.
  // You should use either helpText or helpHandler.
  // if helpText and helpHandler is not set, the help action will not be functioned.
  helpHandler: (req, res) => {
    const message = res.createMessage('Thanks for using /hello command.');
    message.addText('This is just a demo');
    res.send(message);
  },

});


module.exports = command;
