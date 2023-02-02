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
            .populate('bookings')
            .populate('users');
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
      
            const { product } = await booking.populate('product');
      
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
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
        },

        addBooking: async (parent, { bookingDate, bookingStatus, product }, context) => {
            if (context.user) {
              const booking = await Booking.create({
                bookingDate,
                bookingStatus,
                product,
                creator: context.user._id,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { bookings: booking._id } }
              );
      
              return booking;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addProduct: async (parent, { 
            name, 
            description,
            location,
            productStatus,
            image,
            gallery,
            deposit,
            size,
            colour,
            tags,
            categories }, context) => {
            if (context.user) {
              const product = await Product.create({
                name, 
                description,
                location,
                productStatus,
                image,
                gallery,
                deposit,
                size,
                colour,
                tags,
                categories,
                owner: context.user._id,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { products: product._id } }
              );
      
              return product;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        addFavourite: async (parent, { favouriteId }, context) => {
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { favourites: favouriteId } }
              );
      
            return user;
        },

        addFriend: async (parent, { friendId }, context) => {
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { friends: friendId } }
              );
      
            return user;
        },

        updateUser: async (parent, args, context) => {
            if (context.user) {
              return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
      
            throw new AuthenticationError('Not logged in');
        },

        updateBooking: async (parent, { 
            _id,
            bookingDate,
            bookingStatus,
         }, context) => {
            if (context.user) {
            return await Booking.findByIdAndUpdate(_id, { 
            bookingDate: bookingDate, bookingStatus: bookingStatus }, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        },

        updateProduct: async (parent, { 
            _id,
            name,
            description,
            location,
            productStatus,
            image,
            gallery,
            deposit,
            size,
            colour,
            tags,
            categories,
            onLoan
         }, context) => {
            if (context.user) {
            return await Product.findByIdAndUpdate(_id, { 
            name: name, 
            description: description,
            location: location,
            productStatus: productStatus,
            image: image,
            gallery: gallery,
            deposit: deposit,
            size: size,
            colour: colour,
            tags: tags,
            categories: categories,
            onLoan: onLoan, }, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        },

        addTag: async (parent, { name }) => {
            const tag = await Tag.create(name);
      
            return { tag };
        },

        removeProduct: async (parent, { productId }, context) => {
            if (context.user) {
              const product = await Product.findOneAndDelete({
                _id: productId,
                owner: context.user._id,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { products: product._id } }
              );
      
              return product;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeFavourite: async (parent, { favouriteId }, context) => {
            if (context.user) {      
              const currentUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { favourites: favouriteId } }
              );
      
              return currentUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeFriend: async (parent, { friendId }, context) => {
            if (context.user) {      
              const currentUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { friends: friendId } }
              );
      
              return currentUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
        }
    }
};

module.exports = resolvers;