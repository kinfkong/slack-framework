/**
 * Initialize and exports all models.
 */
const Path = require('path');
const fs = require('fs');

// Bootstrap slash commands
const commands = [];
fs.readdirSync(__dirname).forEach((file) => { // eslint-disable-line no-sync
  if (file !== 'index.js') {
    const filename = file.split('.')[0];
    const command = require(Path.join(__dirname, filename)); // eslint-disable-line global-require
    commands.push(command);
  }
});

module.exports = commands;
