const Base = require('./base');
const Attachment = require('./attachment');
const _ = require('lodash');

module.exports = class Message extends Base {
  constructor(options) {
    super(options);
    this.attachments = [];
  }

  addAttachment(text) {
    const attachment = new Attachment(text);
    this.attachments.push(attachment);
    return attachment;
  }

  toObject() {
    const obj = _.extend({}, this.obj);
    if (this.attachments.length > 0) {
      obj.attachments = [];
      this.attachments.forEach((a) => {
        obj.attachments.push(a.toObject());
      });
    }
    return obj;
  }

};