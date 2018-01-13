const asyncWrapper = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const slackEndpoint = (method) => {
  return `https://slack.com/api/${method}`;
};

module.exports = {
  asyncWrapper,
  slackEndpoint
};