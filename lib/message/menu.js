const Action = require('./action');

module.exports = class Menu extends Action {
  constructor(options) {
    super(options);
    this.obj.type = 'select';
  }
};