const httpStatus = require('http-status');
const { Journey } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} journeyBody
 * @returns {Promise<User>}
 */
const createJourney = async (journeyBody) => {
  return Journey.create(journeyBody);
};


/**
 * Like a journey
 * @param {Object} journeyBody
 * @returns {Promise<Journey>}
 */
const likeJourney = async (journeyBody) => {
  return Journey.findByIdAndUpdate(
    journeyBody.journey,
    { $addToSet: { likedBy: journeyBody.user } },
    { new: true }
  )
};

/**
 * Dislike a journey
 * @param {Object} journeyBody
 * @returns {Promise<Journey>}
 */
const dislikeJourney = async (journeyBody) => {
  return Journey.findByIdAndUpdate(
    journeyBody.journey,
    { $pull: { likedBy: journeyBody.user } },
    { new: true }
  )
};


/**
 * Query for journeys
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryJourneys = async (filter, options) => {
  const journeys = await Journey.paginate(filter,{...options, populate:"user"});
  return journeys;
};

module.exports = {
  createJourney,
  queryJourneys,
  likeJourney,
  dislikeJourney
};
