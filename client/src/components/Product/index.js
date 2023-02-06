import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from "react-router-dom";
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_CURRENT_USER, UPDATE_CURRENT_PRODUCT, UPDATE_PRODUCTS } from '../../utils/actions';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import { HeartIcon, UserIcon } from '@heroicons/react/24/solid';
import Auth from "../../utils/auth";

const Product = ({ cat, filters }) => {
    const [state, dispatch] = useStoreContext();

    const { products } = state;

    const { loading, data: productData } = useQuery(QUERY_PRODUCTS);

    useEffect(() => {
        if (productData) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: productData.products,
            });
            productData.products.forEach((product) => {
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
    }, [productData, dispatch]);

    const handleOwnerClick = (id) => {
        dispatch({
            type: UPDATE_CURRENT_USER,
            currentUser: id,
        });
    };

    const handleProductClick = (id) => {
        dispatch({
            type: UPDATE_CURRENT_PRODUCT,
            currentProduct: id,
        });
    };

    console.log(products);
    console.log(filterProducts);


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
    // function showButton() {
    //     if (Auth.loggedIn() ) {
    //         <div className='absolute w-full bg-transparent bottom-px left-px items-end justify-end'>
    //         <div className='w-full justify-center items-center transition duration-300 ease-in-out hover:scale-110'>
    //             <button className='w-full bg-pink font-mont-alt text-lg p-3 py-3 border-2 border-mauve' id="owner-return">Mark Returned</button>
    //         </div>
    //     </div>
    //     } else {
    //         <div></div>
    //     };

    return (
        <div className='p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-3'>
            {filterProducts().map((productEach) => (
                <div className='container flex-1 mb-5' key={productEach._id}>
                    <Link to={`/products/${productEach._id}`} onClick={() => {
                        handleProductClick(`${productEach._id}`);
                    }}>
                        <div className='container relative mb-1'>
                            <div>
                                <img src={productEach.image} className="w-full h-64 object-cover object-center border-mauve border-4" title={productEach.name} alt="product image"></img>
                            </div>
                            {/* Favourite icon = logged in and not owner */}
                            {/* <div className='absolute bg-transparent bottom-px right-px items-end justify-end'>
                    <div className='w10 h10 m-1 p-1 rounded-full bg-white border-mauve border-2 justify-center items-center transition duration-300 ease-in-out hover:scale-110'>
                        <HeartIcon className={Auth.loggedIn() === true ? 'block fill-mauve h-4 w-4' : 'block fill-slate h-4 w-4'}></HeartIcon>
                    </div>
                </div> */}
                            {/* Mark Returned Button = logged in and owner and booked */}
                            {/* <div className='absolute w-full bg-transparent bottom-px left-px items-end justify-end'>
                    <div className='w-full justify-center items-center transition duration-300 ease-in-out hover:scale-110'>
                        <button className='w-full bg-pink font-mont-alt text-lg p-3 py-3 border-2 border-mauve' id="owner-return">Mark Returned</button>
                    </div>
                </div> */}
                            <div className='absolute w-full bg-transparent bottom-px left-px items-end justify-end'>
                                <div className='w-full justify-center items-center transition duration-300 ease-in-out hover:scale-110'>
                                    <button className='w-full bg-pink font-mont-alt text-lg p-3 py-3 border-2 border-mauve' id="owner-return">Mark Returned</button>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className='font-mont-alt text-left text-slate'>
                        <Link to={`/products/${productEach._id}`} onClick={() => {
                            handleProductClick(`${productEach._id}`);
                        }}>
                            <h6 className='text-3xl font-semibold'>{productEach.name}</h6>
                        </Link>
                        <Link to={`/users/${productEach.owner}`} onClick={() => {
                            handleOwnerClick(`${productEach.owner}`);
                        }}>
                            <div className='flex items-center'>
                                <UserIcon className='block fill-pink h-6 w-6'></UserIcon>
                                <p className='px-2 text-2xl'>{productEach.owner}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Product;