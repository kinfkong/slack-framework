/*
 * Copyright (c) 2018 TopCoder, Inc. All rights reserved.
 */

/**
 * This module is the class to representing the slack message.
 *
 * @author TCSCODER
 * @version 1.0
 */

const _ = require('lodash');

const Base = require('./base');
const Attachment = require('./attachment');
const Image = require('./image');

module.exports = class Message extends Base {
  /**
   * Creates the instance.
   * @param {Object} options the options
   */
  constructor(options) {
    super(options);
    this.attachments = [];
  }

  /**
   * Adds the attachment.
   * @param {String} text the attachment text.
   * @returns {Attachment} the attachment.
   */
  addAttachment(text) {
    const attachment = new Attachment(text);
    this.attachments.push(attachment);
    return attachment;
  }

  /**
   * Adds an image attachment.
   * @param {Object} imageOptions the options.
   * @returns {Image} the image attachment.
   */
  addImage(imageOptions) {
    const image = new Image(imageOptions);
    this.attachments.push(image);
    return image;
  }

  /**
   * Converts the class instance to an plain object.
   * @returns {Object} the plain object.
   */
  toObject() {
    const obj = _.assignIn({}, this.obj);
    if (this.attachments.length > 0) {
      obj.attachments = [];
      this.attachments.forEach((a) => {
        obj.attachments.push(a.toObject());
      });
    }
    return obj;
  }
};
