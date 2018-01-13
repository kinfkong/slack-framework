const Base = require('./base');
const Attachment = require('./attachment');
const Image = require('./image');

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

  addImage(imageOptions) {
    const image = new Image(imageOptions);
    this.attachments.push(image);
    return image;
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