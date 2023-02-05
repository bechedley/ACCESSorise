import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Products from "../components/Products";
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_CATEGORIES,
} from '../utils/actions';
import { QUERY_CATEGORIES } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

const ProductList = () => {
    const [state, dispatch] = useStoreContext();
    const { id } = useParams();

    const [currentCategory, setCurrentCategory] = useState({});

    const { loading, data } = useQuery(QUERY_CATEGORIES);

    const { categories } = state;

    useEffect(() => {
        // already in global store
        if (categories.length) {
          setCurrentCategory(categories.find((category) => category._id === id));
        }
        // retrieved from server
        else if (data) {
          dispatch({
            type: UPDATE_CATEGORIES,
            categories: data.categories,
          });
    
          data.categories.forEach((category) => {
            idbPromise('categories', 'put', category);
          });
        }
        // get cache from idb
        else if (!loading) {
          idbPromise('categories', 'get').then((indexedCategories) => {
            dispatch({
              type: UPDATE_CATEGORIES,
              categories: indexedCategories,
            });
          });
        }
      }, [categories, data, loading, dispatch, id]);

    return (
        <div className="w-screen p-5">
            <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center px-3">
                <div className="container p-5 text-center sm:text-left float-left">
                    <h2 className="font-satisfy text-lg sm:text-3xl lg:text-5xl text-slate">
                        Category Name
                    </h2>
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