/*
 * Copyright (c) 2018 TopCoder, Inc. All rights reserved.
 */

/**
 * This module provides some helper methods.
 *
 * @author TCSCODER
 * @version 1.0
 */


/**
 * wrapps the async function to promise.
 * @param {Function} fn the function to wrap.
 * @returns {void}
 */
const asyncWrapper = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

/**
 * Gets the slack endpoint url.
 * @param {String} method the slack api method.
 * @returns {String} the url.
 */
const slackEndpoint = (method) => `https://slack.com/api/${method}`;

module.exports = {
  asyncWrapper,
  slackEndpoint,
};
