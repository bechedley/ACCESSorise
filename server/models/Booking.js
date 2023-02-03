const mongoose = require('mongoose');

const { Schema } = mongoose;

const dateFormat = require('../utils/dateFormat');

const bookingSchema = new Schema({
  createdDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  bookingDate: {
    type: Date,
    require: true,
    get: (timestamp) => dateFormat(timestamp),
  },
  bookingStatus: {
    type: String,
    require: true,
    enum: ['cancelled', 'previous', 'active', 'completed']
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
