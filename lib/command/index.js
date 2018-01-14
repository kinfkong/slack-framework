/*
 * Copyright (c) 2018 TopCoder, Inc. All rights reserved.
 */

/**
 * This module is the class to manage the slash command handlers.
 *
 * @author TCSCODER
 * @version 1.0
 */

const path = require('path');
const fs = require('fs');

const Action = require('../action');

module.exports = class Command extends Action {
  /**
   * Creates the instance.
   * @param {Object} slack the slack instance.
   */
  constructor(slack) {
    super(slack, 'command');
  }

  /**
   * Adds an command handler.
   * @param obj the definition of the command.
   */
  addCommand(obj) {
    if (!obj.helpHandler && obj.helpText) {
      obj.helpHandler = (req, res) => {
        const message = res.createMessage(obj.helpText);
        res.send(message);
      };
    }
    return super.add(obj);
  }

  /**
   * Loads all the commands in a directory.
   * @param {String} directory the directory containing the command definition files.
   * @returns {Array} the loaded commands.
   */
  loadCommands(directory) {
    const commands = [];
    fs.readdirSync(directory).forEach((file) => { // eslint-disable-line no-sync
      if (file !== 'index.js') {
        const filename = file.split('.')[0];
        const command = require(path.join(directory, filename)); // eslint-disable-line global-require
        commands.push(command);
      }
    });
    return commands;
  }
};
