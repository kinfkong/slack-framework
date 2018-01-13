
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
Promise.promisifyAll(request, {multiArgs: true});

const utils = require('../common/utils');


module.exports = class WebAPI {
  constructor(slack) {
    this.slack = slack;
  }
  async apiRequest(method, endpoint, data) {
    if (!data.token) {
      data.token = this.slack.config.oauthAccessToken;
    }
    const options = {
      url: utils.slackEndpoint(endpoint),
      method
    };
    if (method.toUpperCase() === 'GET') {
      options.qs = data;
    } else {
      options.form = data;
    }
    const response = await request(options);
    if (response.statusCode !== 200) {
      throw new Error(`failed to process the request to: ${options.url}`);
    }
    const result = JSON.parse(response.body);
    if (!result.ok) {
      console.error(result);
      throw new Error(`failed to process the request to: ${options.url}`);
    }

    return JSON.parse(response.body);
  };

  async getUserInfo(userId) {
    const response = await this.apiRequest('GET', 'users.info', {user: userId});
    return response.user;
  }
};

