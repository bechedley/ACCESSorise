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
    gallery: String
    deposit: Float
    size: String
    colour: String
    tags: [Tag]
    categories: [Category]
    bookings: [Booking]
    onLoad: Boolean
  }

  type Booking {
    _id: ID!
    purchaseDate: String!
    bookingDate: String!
    bookingStatus: String!
    deposit: Float
  }

  type User {
    _id: ID
    username: String
    email: String
    bookings: [Booking]
    products: [Product]
    favourites: [Product]
    friends: [User]
  }

  type Tag {
    _id: ID!
    name: String
  }

  type Checkout {
    session: ID
  }

  type Friend {
    _id: ID!
    username: String
  }

  type Favourite {
    _id: ID!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    category(_id: ID!): Category
    products: [Product]
    product(_id: ID!): Product
    users: [User]
    user(_id: ID!): User
    userBookings(user: ID): [Booking]
    booking(_id: ID!): Booking
    favourites(user: ID, name: String): [Product]
    friends(user: ID, username: String): [User]
    tags: [Tag]
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
        username: String!
        email: String!
        password: String!
    ): Auth
    addBooking(
        bookingDate: String!
        bookingStatus: String!
        deposit: Float
    ): Booking
    addProduct(
        name: String!
        description: String!
        location: String!
        productStatus: String!
        image: String!
        gallery: String
        deposit: Float
        size: String
        colour: String
        tags: [ID]
        categories: [ID]
    ): Product
    addFavourite(_id: [ID]): Favourite
    addFriend(_id: [ID]): Friend
    updateUser(username: String, email: String, password: String): User
    updateBooking(_id: ID!): Booking
    updateProduct(_id: ID!): Product
    removeProduct(productId: ID!): Product
    removeFavourite(userId: ID!, favouriteId: ID!): Favourite
    removeFriend(userId: ID!, friendId: ID!): Friend
  }
`;

module.exports = typeDefs;
