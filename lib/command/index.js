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
};
