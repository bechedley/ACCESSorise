import React, { useEffect, useState } from 'react';
import Product from '../Product';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';


function Products() {
    const [state, dispatch] = useStoreContext();

    const { currentCategory } = state;

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
    }, [data, loading, dispatch]);

    function filterProducts() {
      if (!currentCategory) {
        return state.products;
      }
  
      return state.products.filter(
        (product) => product.category._id === currentCategory
      );
    }

    return (
        <div className='container p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-3'>
            {filterProducts().map((productEach) => (
                <Product {...productEach} key={productEach._id} />
            ))}
        </div>

    );
}

export default Products;