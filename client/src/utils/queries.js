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
        creator
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
query user($_id: ID!) {
  user(_id: $_id) {
    _id
    username
    email
    bookings {
      _id
      bookingDate
      product
      bookingStatus
      createdAt
    }
    products {
      _id
      name
    }
    favourites {
      _id
      name
      owner
    }
    friends {
      _id
      username
    }
  }
}
`;

export const QUERY_ME = gql`
query me {
  me {
    _id
    username
    email
    bookings {
      _id
      bookingDate
      product 
      bookingStatus
      createdAt
    }
    products {
      _id
      name
    }
    favourites {
      _id
      name
      owner
    }
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
      creator
    }
    products {
      _id
      name
      bookings
      owner
    }
    favourites {
      _id
      name
      owner 
    }
    friends {
      _id
      username
    }
  }
}
`;
