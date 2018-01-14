const _ = require('lodash');
const Base = require('./base');
const Button = require('./button');
const Menu = require('./menu');

module.exports = class Attachment extends Base {
  constructor(options) {
    super(options);
    this.actions = [];
  }

  setAction(action) {
    this.obj.callback_id = action.name;
  }

  addButton(options) {
    const btn = new Button(options);
    this.actions.push(btn);
    return btn;
  }

  addMenu(options) {
    const menu = new Menu(options);
    this.actions.push(menu);
    return menu;
  }

  toObject() {
    const obj = _.assignIn({}, this.obj);
    if (this.actions.length > 0) {
      obj.actions = [];
      this.actions.forEach((a) => {
        obj.actions.push(a.toObject());
      });
    }
    return obj;
  }
};
