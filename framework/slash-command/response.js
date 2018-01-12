const _ = require('lodash');

module.exports = class Response {
  constructor() {
    this.obj = {};
  }

  addText(text) {
    this.obj.text = text;
  }

  toObject() {
    return _.extend({}, this.obj);
  }

  toJSON() {
    return JSON.stringify(this.toObject());
  }
};