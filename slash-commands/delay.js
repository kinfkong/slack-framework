const slack = require('node-slack');
const slashCommand = slack.slashCommand;

const command = slashCommand.define({
  name: '/delay',
  handler: (req, res) => {
    setTimeout(() => {
      res.addText('this is a delay message!');
      res.end();
    }, 15000);
  },
  helpText: 'balba'
});


module.exports = command;