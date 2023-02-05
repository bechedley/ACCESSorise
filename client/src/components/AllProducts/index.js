import React, { useEffect, useState } from 'react';
import Product from '../Product';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';


function AllProducts({ cat, filters }) {
  const [state, dispatch] = useStoreContext();

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch, cat, filters]);

  function filterProducts() {
    if (!cat && !filters) {
      return state.products;

    } else if (cat && !filters) {
      return state.products.filter(
        (product) => product.category._id === cat
      );

    } else if (cat && filters) {
      return state.products.filter(
        (product) => product.category._id === cat && (product.location == filters.location || product.size == filters.size || product.colour == filters.colour)
      );

    } else {
      return state.products.filter(
        (product) => product.location == filters.location || product.size == filters.size || product.colour == filters.colour
      );
    }
  }

  return (
    <div className='container p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-3'>
      {filterProducts().map((productEach) => (
        <Product {...productEach} key={productEach._id} />
      ))}
    </div>

  );
}

export default AllProducts;