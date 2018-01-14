/*
 * Copyright (c) 2018 TopCoder, Inc. All rights reserved.
 */

/**
 * This module is the class to representing slack api wrappers.
 *
 * @author TCSCODER
 * @version 1.0
 */
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const utils = require('../common/utils');
const logger = require('../common/logger');

Promise.promisifyAll(request, {multiArgs: true});

module.exports = class WebAPI {
  /**
   * Creates the instance.
   * @param {Slack} slack the slack instance.
   */
  constructor(slack) {
    this.slack = slack;
  }

  /**
   * Sends a slack api request.
   * @param {String} method the http method, 'GET', 'POST', etc.
   * @param {String} endpoint the endpoint, like 'users.info'
   * @param {Object} data the request data.
   * @returns {Promise.<void>} the result.
   */
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

  /**
   * Gets the user info.
   * @param {String} userId the user id.
   * @returns {Promise.<*|null>} the user info.
   */
  async getUserInfo(userId) {
    const response = await this.apiRequest('GET', 'users.info', {user: userId});
    return response.user;
  }
};
