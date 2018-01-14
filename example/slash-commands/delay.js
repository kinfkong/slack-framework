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
    const defaultDelayTime = 4000;
    let time = defaultDelayTime;
    try {
      time = parseFloat(req.text);
    } catch (err) {
      time = defaultDelayTime;
    }

    if (isNaN(time)) {
      time = defaultDelayTime;
    }

    setTimeout(() => {
      const message = res.createMessage(`This message is sent after ${time} milliseconds.`);
      res.send(message);
    }, time);
  },
  helpText: '/delay [milliseconds] it will delay the time then send the message.',
});


module.exports = command;
