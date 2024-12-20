const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const User = require('./user.model');

const journeySchema = new mongoose.Schema({
  from: {
    type: {
      type: String, // 'Point' for GeoJSON
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  to: {
    type: {
      type: String, // 'Point' for GeoJSON
      enum: ['Point'],
      required: true,
    },
    coordinates: [Number], // [longitude, latitude]
  },
  caption: {
    type: String,
    required: true,
    trim: true,
  },
  figure: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  locations: [
    {
      coordinates: {
        type: {
          type: String, // 'Point' for GeoJSON
          enum: ['Point'],
          required: true,
        },
        coordinates: [Number], // [longitude, latitude]
      },
      href: {
        type: String, // Store image URLs or file paths
        required: false,
      },
    },
  ],
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});
journeySchema.index({ 'from': '2dsphere', 'to': '2dsphere', 'locations.coordinates': '2dsphere' });

// add plugin that converts mongoose to json
journeySchema.plugin(toJSON);
journeySchema.plugin(paginate);

/**
 * @typedef Journey
 */
const Journey = mongoose.model('Journey', journeySchema);

module.exports = Journey;
