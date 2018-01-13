const _ = require('lodash');
const Base = require('./base');
const Button = require('./button');

module.exports = class Attachment extends Base {
  constructor(text) {
    super(text);
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

  toObject() {
    const obj = _.extend({}, this.obj);
    if (this.actions.length > 0) {
      obj.actions = [];
      this.actions.forEach((a) => {
        obj.actions.push(a.toObject());
      });
    }
    return obj;
  }
};