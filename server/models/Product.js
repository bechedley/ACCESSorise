const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    productStatus: {
        type: String
    },
    image: {
        type: String
    },
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
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
