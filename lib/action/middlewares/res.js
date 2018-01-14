/*
 * Copyright (c) 2018 TopCoder, Inc. All rights reserved.
 */

/**
 * This module is a class representing the res for the command handler.
 *
 * @author TCSCODER
 * @version 1.0
 */

const Promise = require('bluebird');
const request = Promise.promisify(require('request'));

Promise.promisifyAll(request, {multiArgs: true});

const Message = require('../../message/message');

/**
 * Helper method to send request to remote url.
 * @param {String} url the url to send.
 * @param {Object} data the data to send.
 *
 * @returns {void} nothing
 *
 * @throws {Error} error if there is any error.
 */
const _sendRemote = (url, data) =>
  request.postAsync(url, {json: data}).spread((response) => {
    if (response.statusCode !== 200) { // eslint-disable-line no-magic-numbers
      throw new Error(`failed to send the msg to url: ${url}`);
    }
  });

module.exports = class Res {
  /**
   * Constructs the instance.
   * @param {Action} action the action.
   * @param {String} responseURL the responsce url.
   * @param {Object} res the express raw res.
   */
  constructor(action, responseURL, res) {
    this.action = action;
    this.isDelay = false;
    this.sent = false;
    this.expressRes = res;
    this.responseURL = responseURL;
  }

  /**
   * Creates a message.
   * @param {String} text the message text.
   * @returns {Message} message instance.
   */
  createMessage(text) {
    return new Message({
      text,
      response_type: this.action.responseType,
    });
  }

  /**
   * Sends a message to slack.
   * @param {Message} message the message to send.
   * @returns {void}
   */
  send(message) {
    this.sent = true;
    if (this.isDelay) {
      // send to the response url
      _sendRemote(this.responseURL, message.toObject());
    }
    // send the response
    this.expressRes.json(message.toObject());
  }

  /**
   * Sends an empty response to slack.
   * This is used to send temporary response to slack for delay message.
   * @returns {void}
   */
  _sendTempResponse() {
    // send empty response
    this.isDelay = true;
    this.expressRes.send();
  }
};
