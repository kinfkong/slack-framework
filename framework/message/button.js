const Action = require('./action');
module.exports = class Button extends Action {
  constructor({name, text, value}) {
    super(text);
    this.obj.name = name;
    this.obj.value = value;
    this.obj.type = 'button';
  }
};