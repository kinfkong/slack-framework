const asyncWrapper = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

const slackEndpoint = (method) => `https://slack.com/api/${method}`;

module.exports = {
  asyncWrapper,
  slackEndpoint,
};
