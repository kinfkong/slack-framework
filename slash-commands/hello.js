const slack = require('node-slack');
const commands = slack.commands;

const command = commands.addCommand({
  name: '/hello',
  handler: (req, res) => {
    const message = res.createMessage('Hello World!');
    res.send(message);
  }
});


module.exports = command;