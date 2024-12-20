const Joi = require('joi');

const createJourney = {
  body: Joi.object().keys({
    from: Joi.object().required(),
    to: Joi.object().required(),
    locations: Joi.array().items(Joi.object()).required().min(0),
    caption: Joi.string().required(),
    figure: Joi.string().required(),
  }),
};

const getJourneys = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};


module.exports = {
  createJourney,
  getJourneys,
};
