import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import CategoryItem from '../CategoryItem';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_CATEGORIES } from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function Categories() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);


  return (
    <div className='container p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-3'>
      {categories.map((categoryEach) => (
        <CategoryItem {...categoryEach} key={categoryEach.id} />
      ))}
    </div>

  );
}

export default Categories;