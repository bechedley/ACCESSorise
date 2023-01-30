const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  bookIn: {
    type: Date,
    require: true
  },
  bookOut: {
    type: Date,
    require: true
  },
  orderStatus: {
    type: String,
    require: true,
    enum: ['cancel', 'previous', 'active', 'completed']
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
