const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
Promise.promisifyAll(request, {multiArgs: true});

const Message = require('./message/message');

const _sendRemote = (url, data) => {
  return request.postAsync(url, {json: data}).spread((response, body) => {
    if (response.statusCode !== 200) {
      throw new Error('failed to send the msg');
    }
  });
};

module.exports = class Res {
  constructor(responseURL, res) {
    this.isDelay = false;
    this.sent = false;
    this.expressRes = res;
    this.responseURL = responseURL;
  }

  addText(text) {
    this.response.text = text;
  }

  createMessage(text) {
    return new Message(text);
  }

  send(message) {
    this.sent = true;
    if (this.isDelay) {
      // send to the response url
      return _sendRemote(this.responseURL, message.toObject());
    } else {
      // send the response
      this.expressRes.json(message.toObject());
    }
  }


  _sendTempResponse() {
    // send empty response
    this.isDelay = true;
    this.expressRes.send();
  }
};