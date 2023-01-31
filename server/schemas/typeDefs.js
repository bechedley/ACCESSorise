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
    bookings: [Order]
    onLoad: Boolean
  }

  type Order {
    _id: ID!
    purchaseDate: String!
    bookIn: String!
    bookOut: String!
    orderStatus: String!
  }

  type User {
    _id: ID
    username: String
    email: String
    orders: [Order]
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

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    category(_id: ID!): Category
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    users: [User]
    user(_id: ID!): User
    userProducts(user: ID, name: String): [Product]
    userProduct(user: ID, _id: ID!): Product
    userFavourites(user: ID, name: String): [Product]
    userFriends(user: ID, username: String): [User]
    tags: [Tag]
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(username: String, email: String, password: String): User
    updateProduct(_id: ID!, #): Product
    login(email: String!, password: String!): Auth
    addFriend
    addProduct
    addFavourite
    updateOrder
    removeFriend
    removeProduct
    removeFavourite
  }
`;

module.exports = typeDefs;
