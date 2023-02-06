import React, { useEffect, useState } from 'react';
import Product from '../Product';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';


function AllProducts({ cat, filters }) {

  return (
    <div className='container p-5 pb-3'>
        <Product />
    </div>

  );
}

export default AllProducts;