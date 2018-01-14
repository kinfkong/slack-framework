
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const utils = require('../common/utils');
const logger = require('../common/logger');

Promise.promisifyAll(request, {multiArgs: true});

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
      method,
    };
    if (method.toUpperCase() === 'GET') {
      options.qs = data;
    } else {
      options.form = data;
    }
    const response = await request(options);
    if (response.statusCode !== 200) { // eslint-disable-line no-magic-numbers
      const err = new Error(`failed to process the request to: ${options.url}`);
      err.data = response;
      logger.logFullError(err, 'apiRequest');
      throw err;
    }

    const result = JSON.parse(response.body);
    if (!result.ok) {
      const err = new Error(`failed to process the request to: ${options.url}`);
      err.data = result;
      logger.logFullError(err, 'apiRequest');
      throw err;
    }

    return JSON.parse(response.body);
  }

  async getUserInfo(userId) {
    const response = await this.apiRequest('GET', 'users.info', {user: userId});
    return response.user;
  }
};
