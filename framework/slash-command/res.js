const Promise = require('bluebird');
const request = Promise.promisify(require("request"));

const _sendRemote = (url, data) => {
  return request.postAsync(url, {json: data}).spread((response, body) => {
    if (response.statusCode !== 200) {
      throw new Error('failed to send the msg');
    }
  });
};

module.exports = class Res {
  constructor(req, res) {
    this.isDelay = false;
    this.sent = false;
    this.expressRes = res;
    this.expressReq = req;
  }

  send(response) {
    const obj = response.toObject();
    this.sent = true;
    if (this.isDelay) {
      // send to the response url
      const responseURL = this.expressReq.body.response_url;

      return _sendRemote(responseURL, obj);
    } else {
      // send the response
      this.expressRes.json(obj);
    }
  }

  sendTempResponse() {
    // send empty response
    this.isDelay = true;
    this.expressRes.send();
  }
};