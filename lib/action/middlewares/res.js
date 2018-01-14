const Promise = require('bluebird');
const request = Promise.promisify(require('request'));

Promise.promisifyAll(request, {multiArgs: true});

const Message = require('../../message/message');

const _sendRemote = (url, data) =>
  request.postAsync(url, {json: data}).spread((response) => {
    if (response.statusCode !== 200) { // eslint-disable-line no-magic-numbers
      throw new Error(`failed to send the msg to url: ${url}`);
    }
  });

module.exports = class Res {
  constructor(action, responseURL, res) {
    this.action = action;
    this.isDelay = false;
    this.sent = false;
    this.expressRes = res;
    this.responseURL = responseURL;
  }

  createMessage(text) {
    return new Message({
      text,
      response_type: this.action.responseType,
    });
  }

  send(message) {
    this.sent = true;
    if (this.isDelay) {
      // send to the response url
      return _sendRemote(this.responseURL, message.toObject());
    }
    // send the response
    return this.expressRes.json(message.toObject());
  }

  _sendTempResponse() {
    // send empty response
    this.isDelay = true;
    this.expressRes.send();
  }
};
