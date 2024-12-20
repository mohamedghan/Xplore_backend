const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { jourService } = require('../services');

const createJourney = catchAsync(async (req, res) => {
  const journey = await jourService.createJourney({...req.body, user: req.user._id});
  res.status(httpStatus.CREATED).send({journey, myuid: req.user._id});
});

const likeJourney = catchAsync(async (req, res) => {
  const journey = await jourService.likeJourney({...req.params, user: req.user._id});
  res.status(httpStatus.CREATED).send({journey, myuid: req.user._id});
});

const dislikeJourney = catchAsync(async (req, res) => {
  const journey = await jourService.dislikeJourney({...req.params, user: req.user._id});
  res.status(httpStatus.CREATED).send({journey, myuid: req.user._id});
});

const getJourneys = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await jourService.queryJourneys(filter, options);
  res.send({...result, myuid: req.user._id});
});

module.exports = {
  createJourney,
  getJourneys,
  likeJourney,
  dislikeJourney
};
