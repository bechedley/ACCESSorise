import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $description: String!
    $location: String!
    $productStatus: String!
    $image: String!
    $gallery: [String]
    $deposit: Float
    $size: String
    $colour: String
    $tags: [String]
    $categories: [ID]
  ) {
    addProduct(
      name: $name
      description: $description
      location: $location
      productStatus: $productStatus
      image: $image
      gallery: $gallery
      deposit: $deposit
      size: $size
      colour: $colour
      tags: $tags
      categories: $categories
    ) {
      product {
        _id
      }
    }
  }
`;
