const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    productStatus: {
        type: String,
        require: true,
        enum: ['public', 'friendsOnly', 'hidden']
    },
    image: {
        type: String,
        require: true
    },
    gallery: [
        {
          type: String,
        }
    ],
    deposit: {
        type: Number,
    },
    size: {
        type: String,
    },
    colour: {
        type: String,
    },
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tag',
        },
    ],
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        },
    ],
    bookings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Booking',
        },
    ],
    onLoan: {
        type: Boolean,
        default: false
    },
    owner: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
