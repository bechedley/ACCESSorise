import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Products from "../components/Products";
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_CATEGORIES } from '../utils/actions';
import { QUERY_CATEGORIES } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

const ProductList = () => {
    const [state, dispatch] = useStoreContext();

    const { currentCategory } = state;

    const { loading, data } = useQuery(QUERY_CATEGORIES);

    useEffect(() => {
      if (data) {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: data.categories,
        });
        data.categories.forEach((category) => {
          idbPromise('categories', 'put', category);
        });
      } else if (!loading) {
        idbPromise('categories', 'get').then((category) => {
          dispatch({
            type: UPDATE_CATEGORIES,
            categories: categories,
          });
        });
      }
    }, [data, loading, dispatch]);

    function filterCategories() {
      if (!currentCategory) {
        return state.categories;
      }
  
      return state.categories.filter(
        (category) => category._id === currentCategory
      );
    }

    return (
        <div className="w-screen p-5">
            <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center px-3">
                <div className="container p-5 text-center sm:text-left float-left">
                {filterCategories().map((category) => (
                    <h2 className="font-satisfy text-lg sm:text-3xl lg:text-5xl text-slate" key={category._id}>{category.name}
                    </h2>
                    ))}
                </div>
                <div className="float-right">
                    <button className="p-2 px-4 bg-pink rounded-md font-satisfy text-center text-slate text-4xl" href="#">Filter</button>
                </div>
            </div>
            <div>
                <Products />
            </div>
        </div>

    );
};

export default ProductList;