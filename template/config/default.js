/*
 * Copyright (c) 2018 TopCoder, Inc. All rights reserved.
 */

/**
 * This is the configuration for the aplication.
 *
 * @author TCSCODER
 * @version 1.0
 */
/* eslint-disable no-magic-numbers */
module.exports = {
  PORT: process.env.PORT || 3000,
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',

  SLACK_APP_CLIENT_ID: process.env.SLACK_APP_CLIENT_ID,
  SLACK_APP_CLIENT_SECRET: process.env.SLACK_APP_CLIENT_SECRET,
  SLACK_APP_VERIFICATION_TOKEN: process.env.SLACK_APP_VERIFICATION_TOKEN,
  SLACK_APP_OAUTH_ACCESS_TOKEN: process.env.SLACK_APP_OAUTH_ACCESS_TOKEN,

  SLACK_APP_IMMEDIATE_MESSAGE_TIMEOUT_LIMIT: process.env.SLACK_APP_IMMEDIATE_MESSAGE_TIMEOUT_LIMIT || 2000,
};
