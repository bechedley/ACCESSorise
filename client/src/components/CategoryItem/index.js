import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

const CategoryItem = (props) => {
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

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };
    
    return (
        <div className='container flex-1 relative mb-2'>
            <Link to={`/categories/${props._id}`}onClick={() => {
            handleClick(`${props._id}`);
          }}>
            <div>
                    <img src={props.img} className="w-full h-72 object-cover object-center" title={props.name} alt="category image"></img>
            </div>
            <div className='absolute flex justify-center items-center w-full h-full top-0 left-0 bg-white bg-opacity-60 border-mauve border-4'>
                <h1 className='font-satisfy text-center text-slate text-6xl'>{props.name}</h1>
            </div>
            </Link>
        </div>

    );
}

export default CategoryItem;