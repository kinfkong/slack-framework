const slack = require('node-slack');
const slashCommand = slack.slashCommand;

const command = slashCommand.define({
  name: '/hello',
  handler: (req, res) => {
    res.addText('Hello World!');
    res.end();
  },
  helpText: 'balba'
});


module.exports = command;