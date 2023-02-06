import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  {
    products {
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
      categories {
        _id
      }
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
      owner
    }
  }
`;

export const QUERY_BOOKINGS = gql`
{
  bookings {
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
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
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
      categories {
        _id
      }
      bookings {
        _id
        bookingDate
        bookingStatus
      }
      onLoan
      owner
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
      image
    }
  }
`;

export const QUERY_USER = gql`
{
  user {
    _id
    username
    bookings {
      _id
      createdAt
      bookingDate
      bookingStatus
      product
    }
    products {
      _id
      name
      bookings
    }
    favourites {
      _id
      name
      owner {
        _id
        username
      }
    }
    friends {
      _id
      username
    }
  }
}
`;

export const QUERY_ME = gql`
{
  user {
    _id
    username
    bookings {
      _id
      createdAt
      bookingDate
      bookingStatus
      product
    }
    products {
      _id
      name
      bookings
    }
    favourites {
      _id
      name
      owner {
        _id
        username
      }
    }
    friends {
      _id
      username
    }
  }
}
`;

export const QUERY_FAVOURITES = gql`
query getFavourites($user: ID!, favouriteId: ID!) {
  favourites(_id: $user, favourite._id: favouriteId) {
    _id
    favourites {
      _id
      name
      owner
    }
  }
}
`;

export const QUERY_FRIENDS = gql`
query getFriends($user: ID!, friendId: ID!) {
  friends(_id: $user, friend._id: friendId) {
    _id
    friends {
      _id
      username
    }
  }
}
`;

export const QUERY_USERS = gql`
{
  users {
    _id
    username
    email
    bookings {
      _id
      createdAt
      bookingDate
      bookingStatus
      product
    }
    products {
      _id
      name
      bookings
    }
    favourites {
      _id
      name
      owner {
        _id
        username
      }
    }
    friends {
      _id
      username
    }
  }
}
`;
