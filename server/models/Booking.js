const mongoose = require('mongoose');

const { Schema } = mongoose;

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
    enum: ['cancel', 'previous', 'active', 'completed']
  },
  deposit: {
    type: Number,
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
