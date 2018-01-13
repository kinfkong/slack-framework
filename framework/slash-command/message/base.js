const _ = require('lodash');

module.exports = class Base {
  constructor(text) {
    this.obj = {
      text: text
    };
  }

  addText(text) {
    if (this.obj.text) {
      this.obj.text = `${this.obj.text}\n${text}`;
    } else {
      this.obj.text = text;
    }
  }

  toObject() {
    return _.extend({}, this.obj);
  }

};