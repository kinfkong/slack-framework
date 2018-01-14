/*
 * Copyright (c) 2018 TopCoder, Inc. All rights reserved.
 */

/**
 * This module is the demo command to show a delay message.
 *
 * @author TCSCODER
 * @version 1.0
 */

const slack = require('../slack-framework');

const commands = slack.commands;

const command = commands.addCommand({
  name: '/delay',
  handler: (req, res) => {
    setTimeout(() => {
      const message = res.createMessage('this is a delay message!');
      res.send(message);
    }, 15000); // eslint-disable-line no-magic-numbers
  },
  helpText: 'balba',
  responseType: 'in_channel',
});


module.exports = command;
