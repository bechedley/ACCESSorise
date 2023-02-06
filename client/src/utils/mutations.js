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

export const ADD_BOOKING = gql`
  mutation addBooking(
    $bookingDate: String!
    $bookingStatus: String!
    $product: ID!
  ) {
    addBooking(
      bookingDate: $bookingDate
      bookingStatus: $bookingStatus
      product: $product
    ) {
      booking {
        _id
        createdDate
        bookingDate
        bookingStatus
        product {
          _id
          name
          owner
        }
        creator {
          _id
          username
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
        name
        description
        location
        productStatus
        image
        gallery
        deposit
        size
        colour
        tags
        categories
      }
    }
  }
`;

export const ADD_FAVOURITE = gql`
  mutation addFavourite(
    $favouriteId: ID!
  ) {
    addFavourite(
      favouriteId: $favouriteId
    ) {
      user {
        _id
        favourites {
          _id
          name
          owner
        }
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend(
    $friendId: ID!
  ) {
    addFriend(
      friendId: $friendId
    ) {
      user {
        _id
        friends {
          _id
          username
        }
      }
    }
  }
`;

export const UPDATE_BOOKING = gql`
  mutation updateBooking(
    $id: ID!
    $bookingDate: String!
    $bookingStatus: String!
    $product: ID!
    $creator: ID
  ) {
    updateBooking(
      _id: $id
      bookingDate: $bookingDate
      bookingStatus: $bookingStatus
      product: $product
      creator: $creator
    ) {
      booking {
        _id
        createdDate
        bookingDate
        bookingStatus
        product {
          _id
          name
          owner
        }
        creator {
          _id
          username
        }
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $_id: ID!
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
    $bookings: [ID]
    $onLoan: Boolean
    $owner: ID
  ) {
    updateProduct(
      _id: $_id
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
      bookings: $bookings
      onLoan: $onLoan
      owner: $owner
    ) {
      product {
        _id
        name
        description
        location
        productStatus
        image
        gallery
        deposit
        size
        colour
        tags
        categories
        bookings {
          _id
          bookingDate
          bookingStatus
          creator {
            _id
            username
          }
        }
        onLoan
        owner {
          _id
          username
        }
      }
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation removeProduct($productId: ID!) 
  {
    removeProduct(
      _id: $productId
    ) {
      product {
        _id
      }
    }
  }
`;

export const REMOVE_FAVOURITE = gql`
  mutation removeFavourite($favouriteId: ID!) 
  {
    removeFavourite(
      favourites._id: $favouriteId
    ) {
      favourite {
        _id
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($friendId: ID!) 
  {
    removeFriend(
      friends._id: $friendId
    ) {
      friend {
        _id
      }
    }
  }
`;
