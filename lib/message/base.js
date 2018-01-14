const _ = require('lodash');

module.exports = class Base {
  constructor(options) {
    if (_.isObject(options)) {
      this.obj = options;
    } else {
      this.obj = {
        text: options,
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

  assignIn(obj) {
    this.obj = _.assignIn(this.obj, obj);
  }

  set(fieldName, fieldValue) {
    this.obj[fieldName] = fieldValue;
  }

  toObject() {
    return _.assignIn({}, this.obj);
  }
};
