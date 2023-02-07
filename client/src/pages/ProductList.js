import React, { useEffect } from "react";
import Product from "../components/Product";
import { useParams } from "react-router-dom";
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_CATEGORIES } from '../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import Auth from "../utils/auth";

const ProductList = () => {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const { categories, currentCategory } = state;

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
  }, [loading, data, dispatch]);


  function filterCategories() {
    if (!currentCategory) {
      return state.categories;
    }

    return state.categories.filter(
      (category) => category._id === id
    );
  }
  

  return (
    <div className="w-screen min-h-screen p-5">
        <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center px-3">
          <div className="container p-5 text-center sm:text-left float-left">
            {filterCategories().map((category) => (
              <h2 className="font-satisfy text-lg sm:text-3xl lg:text-5xl text-slate" key={category._id}>{category.name}
              </h2>
            ))}
          </div>
        </div>
        <div>
          <Product cat={id} own={''} />
        </div>
    </div>

  );
};

export default ProductList;