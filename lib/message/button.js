const Action = require('./action');

module.exports = class Button extends Action {
  constructor(options) {
    super(options);
    this.obj.type = 'button';
  }
};
