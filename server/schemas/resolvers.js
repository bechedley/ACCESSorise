const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Booking, Tag } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },

        category: async (parent, { _id }) => {
            return await Category.findById(_id);
        },

        tags: async () => {
            return await Tag.find();
        },

        products: async () => {
            return await Product.find()
            .populate('categories')
            .populate('user')
            .populate('tags')
            .populate('bookings');
        },

        product: async (parent, { _id }) => {
            return await Product.findById(_id)
            .populate('categories')
            .populate('user')
            .populate('tags')
            .populate('bookings');
        },

        users: async () => {
            return User.find()
            .populate('products')
            .populate('bookings');
        },

        user: async (parent, { _id }) => {
            return await User.findById(_id)
            .populate('products')
            .populate('bookings')
            .populate({
                path: 'bookings.products',
                populate: 'categories'
              });
            
        },

        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id })
              .populate('products')
              .populate('bookings')
              .populate({
                path: 'bookings.products',
                populate: 'categories'
              });
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        bookings: async () => {
            return await Booking.find()
            .populate('product')
            .populate('user');
        },

        booking: async (parent, { _id }, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id).populate({
                path: 'bookings.products',
                populate: 'categories'
              });
      
              return user.bookings.id(_id);
            }
      
            throw new AuthenticationError('Not logged in');
        },

        favourites: async (parent, { user, name }) => {
            const params = {};
      
            if (user) {
              params.user = user;
            }
      
            if (name) {
              params.name = {
                $regex: name
              };
            }
      
            return await Product.find(params)
            .populate('categories')
            .populate('user')
            .populate('tags')
            .populate('bookings');
        },

        friends: async (parent, { user, username }) => {
            const params = {};
      
            if (user) {
              params.user = user;
            }
      
            if (username) {
              params.username = {
                $regex: username
              };
            }
      
            return await User.find(params)
            .populate('products')
            .populate('bookings');
        },

        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const booking = new Booking({ product: args.product });
            const line_items = [];
      
            const { product } = await order.populate('product');
      
              const productItem = await stripe.products.create({
                name: product.name,
                description: product.description,
                images: [`${url}/images/${product.image}`]
              });
      
              const price = await stripe.prices.create({
                product: productItem.id,
                unit_amount: product.deposit * 100,
                currency: 'aud',
              });
      
              line_items.push({
                price: price.id,
                quantity: 1
              });
      
            const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items,
              mode: 'payment',
              success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${url}/`
            });
      
            return { session: session.id };
        }
    },
    Mutation: {
        
    }
}