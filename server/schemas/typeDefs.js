const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID!
    name: String
  }

  type Product {
    _id: ID!
    name: String!
    description: String!
    location: String!
    productStatus: String!
    image: String!
    gallery: [String]
    deposit: Float
    size: String
    colour: String
    tags: [String]
    categories: [Category]
    bookings: [Booking]
    onLoan: Boolean
    owner: User
  }

  type Booking {
    _id: ID!
    createdDate: String!
    bookingDate: String!
    bookingStatus: String!
    product: Product
    creator: User
  }

  type User {
    _id: ID
    username: String!
    email: String!
    bookings: [Booking]
    products: [Product]
    favourites: [Product]
    friends: [User]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Favourite {
    _id: ID!
    username: User
  }

  type Friend {
    _id: ID
    username: User
  }

  type Query {
    categories: [Category]
    category(_id: ID!): Category
    products: [Product]
    product(_id: ID!): Product
    users: [User]
    user(_id: ID!): User
    me: User
    bookings: [Booking]
    booking(_id: ID!): Booking
    favourites(user: ID, name: String): [Product]
    friends(user: ID, username: String): [User]
    checkout(product: ID!): Checkout
  }

  type Mutation {
    addUser(
        username: String!,
        email: String!,
        password: String!,
        bookings: [ID],
        products: [ID]
    ): Auth
    addBooking(
        bookingDate: String!,
        bookingStatus: String!,
        product: ID,
        creator: ID
    ): Booking
    addProduct(
        name: String!,
        description: String!,
        location: String!,
        productStatus: String!,
        image: String!,
        gallery: [String],
        deposit: Float,
        size: String,
        colour: String,
        tags: [String],
        categories: [ID],
        bookings: [ID],
        onLoan: Boolean,
        owner: ID
    ): Product
    addFavourite(favouriteId: ID!): User
    addFriend(friendusername: String!): User
    updateUser(username: String, email: String, password: String): User
    updateBooking(
        _id: ID!,
        bookingDate: String,
        bookingStatus: String,
        creator: ID
    ): Booking
    updateProduct(
        _id: ID!,
        name: String,
        description: String,
        location: String,
        productStatus: String,
        image: String,
        gallery: [String],
        deposit: Float,
        size: String,
        colour: String,
        tags: [String],
        categories: [ID],
        bookings: [ID],
        onLoan: Boolean,
        owner: ID
    ): Product
    removeProduct(productId: ID!): Product
    removeFavourite(favouriteId: ID!): Favourite
    removeFriend(friendUsername: String!): Friend
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
