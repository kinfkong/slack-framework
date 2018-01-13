const _ = require('lodash');

module.exports = class Base {
  constructor(options) {
    if (_.isObject(options)) {
      this.obj = options;
    } else {
      this.obj = {
        text: text
      };
    }
  }

  addText(text) {
    if (this.obj.text) {
      this.obj.text = `${this.obj.text}\n${text}`;
    } else {
      this.obj.text = text;
    }
  }

  extend(obj) {
    this.obj = _.extend(this.obj, obj);
  }

  set(fieldName, fieldValue) {
    this.obj[fieldName] = fieldValue;
  }

  toObject() {
    return _.extend({}, this.obj);
  }

};