/*
 * Copyright (c) 2018 TopCoder, Inc. All rights reserved.
 */

/**
 * This module is middlewares used in the express for command request handling.
 *
 * @author TCSCODER
 * @version 1.0
 */

const _ = require('lodash');
const logger = require('../../common/logger');
const wrapper = require('../../common/utils').asyncWrapper;
const Res = require('./res');

/**
 * Validates if this is a valid slack request.
 * @param {Object} req the express slack request.
 * @param {Object} slack the slack instance.
 * @throws error if it is not valid.
 */
const safeGuard = (req, slack) => {
  const requestToken = req.token || req.payload.token;
  if (requestToken !== slack.config.verificationToken) {
    throw new Error(`Verification token is invalid ${requestToken} ${slack.config.verificationToken}`);
  }
};

/**
 * Parses the express request to a command request.
 * @param {Object} req the express request.
 * @param {Object} slack the slack instance.
 * @param {Action} action the action or command.
 * @param {String} type 'action' or 'command'
 * @returns {Promise.<void>} the command request.
 */
const parseRequest = async (req, slack, action, type) => {
  const webAPI = slack.webAPI;
  const slackRequest = _.assignIn({}, type === 'command' ? req : req.payload);

  if (type === 'action') {
    if (slackRequest.actions && slackRequest.actions.length > 0) {
      slackRequest.target = slackRequest.actions[0];
    } else {
      slackRequest.target = null;
    }
  }
  if (_.includes(action.scopes, 'users:read') >= 0) {
    const userId = slackRequest.user_id || slackRequest.user.id;
    slackRequest.userInfo = await webAPI.getUserInfo(userId);
  }

  slackRequest.isHelpAction = false;
  if (type === 'command' && slackRequest.text && slackRequest.text.trim().toLowerCase() === 'help' && action.helpHandler) {
    slackRequest.isHelpAction = true;
  }

  return slackRequest;
};

module.exports = (slack, type) =>
  wrapper(async (req, res) => {
    // validate the request
    if (type === 'action') {
      req.body.payload = JSON.parse(req.body.payload);
    }
    safeGuard(req.body, slack);

    let name = null;
    let actions = null;
    if (type === 'command') {
      name = req.body.command;
      actions = slack.commands;
    } else {
      name = req.body.payload.callback_id;
      actions = slack.actions;
    }

    const action = actions.get(name);

    if (!action) {
      throw new Error(`cannot get the command ${name}`);
    }

    const slackRequest = await parseRequest(req.body, slack, action, type);
    const slackResponse = new Res(action, slackRequest.response_url, slackRequest, res);

    logger.debug(JSON.stringify(slackRequest, null, 2)); // eslint-disable-line no-magic-numbers

    // delegate to custom handler
    if (slackRequest.isHelpAction) {
      action.helpHandler(slackRequest, slackResponse);
    } else {
      action.handler(slackRequest, slackResponse);
    }
    setTimeout(() => {
      if (!slackResponse.sent) {
        slackResponse._sendTempResponse();
      }
    }, slack.config.immediateMessageTimeoutLimit);
  });

