const slack = require('node-slack');
const slashCommand = slack.slashCommand;

const command = new slashCommand.definition({
  name: '/hello',
  handler: (req, res) => {
    const response = slashCommand.response();
    response.addText(`Hello World! Welcome ${req.user.name}!`);
    res.send(response);
  },
  helpText: 'balba'
});


module.exports = command;