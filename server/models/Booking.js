const mongoose = require('mongoose');

const { Schema } = mongoose;
const User = require('./User');

const bookingSchema = new Schema({
  createdDate: {
    type: Date,
    default: Date.now
  },
  bookingDate: {
    type: Date,
    require: true
  },
  bookingStatus: {
    type: String,
    require: true,
    enum: ['cancelled', 'previous', 'active', 'completed']
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  creator: {
    type: String,
    required: true
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
