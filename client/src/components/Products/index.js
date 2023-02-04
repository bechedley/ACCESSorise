import { useState } from 'react';
import { Link } from "react-router-dom";
import { products } from '../../data';
import Product from '../Product';


function Products() {

    return (
        <div className='container p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-3'>
            {products.map((productEach) => (
                <Product {...productEach} key={productEach.id} />
            ))}
        </div>

    );
}

export default Products;