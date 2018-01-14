const path = require('path');
const fs = require('fs');

const Action = require('../action');

module.exports = class Command extends Action {
  constructor(slack) {
    super(slack, 'command');
  }

  addCommand(obj) {
    if (!obj.helpHandler) {
      obj.helpHandler = (req, res) => {
        const message = res.createMessage(obj.helpText || `There is no help for command ${obj.name}`);
        res.send(message);
      };
    }
    return super.add(obj);
  }

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
