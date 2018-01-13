const Action = require('./action');

module.exports = class Menu extends Action {
  constructor({name, text, selectOptions}) {
    super(text);
    this.obj.name = name;
    this.obj.options = selectOptions;
    this.obj.type = 'select';
  }
};