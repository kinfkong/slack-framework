const Action = require('../action');
module.exports = class Command extends Action {
  constructor(slack) {
    super(slack, 'command');
  }

  addCommand(obj) {
    return super.add(obj);
  }
};