import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Favourites from './pages/Favourites';
import Contact from './pages/Contact';
import Policies from './pages/Policies';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { StoreProvider } from './utils/GlobalState';
// import Success from './pages/Success';
import BookingHistory from './pages/BookingHistory';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Nav />
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
              element={<Login />} 
              />
              <Route
                path="/me"
              element={<Profile />} 
              />
              <Route
                path="/users/:id"
              element={<Profile />} 
              />
              <Route
                path="/favourites"
              element={<Favourites />} 
              />
              <Route
                path="/contact"
              element={<Contact />} 
              />
              <Route
                path="/policies"
              element={<Policies />} 
              />
              <Route
                path="/signup"
              element={<Signup />} 
              />
              <Route
                path="/success"
              // element={<Success />} 
              />
              <Route
                path="/booking-history"
              element={<BookingHistory />} 
              />
              <Route
                path="/categories/:id"
                element={<ProductList />}
              />
              <Route
                path="/products/:id"
                element={<Product />}
              />
              <Route
                path="/bookings/:id"
                element={<Product />}
              />
              <Route
                path="*"
              element={<NoMatch />} 
              />
            </Routes>
            <Footer />
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
