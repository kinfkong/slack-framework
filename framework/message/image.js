const Attachment = require('./attachment');
const _ = require('lodash');
module.exports = class Image extends Attachment {
  constructor(options) {
    super(options);
    this.obj.type = 'button';
  }
};