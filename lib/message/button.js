const Action = require('./action');
const _ = require('lodash');
module.exports = class Button extends Action {
  constructor(options) {
    super(options);
    this.obj.type = 'button';
  }
};