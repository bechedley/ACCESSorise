import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import { HeartIcon, UserIcon } from '@heroicons/react/24/solid';
import Modal from '../Modal';
import Backdrop from '../Backdrop';
import Auth from "../../utils/auth";

const Product = ({ cat, own }) => {

    const [state, dispatch] = useStoreContext();

    const { currentCategory } = state;

    const { loading, data } = useQuery(QUERY_PRODUCTS);

    // State to record filter choices
    const [productFilters, setProductFilters] = useState([]);

    // State to open filter modal
    const [productFilterState, setProductFilterState] = useState(false);

    const handleFilterProductBtn = () => {
        setProductFilterState(true);
    };

    const filterProductModalDismissHandler = () => {
        setProductFilterState(false);
    };

    const filterProductModalConfirmHandler = () => {
        setProductFilterState(false);
    };

    const handleProductFilters = (e) => {
        const value = e.target.value;
        setProductFilters({
            ...productFilters,
            [e.target.name]: value
        })
    };

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
        if (!cat) {
            return state.products;
        }

        return state.products.filter(
            (product) => product.categories._id === cat
        );
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
        <div className='container flex flex-row gap-6 flex-cols-3 p-5 pb-3'>
            <React.Fragment>
                {/* Modal Input */}
                {productFilterState && <Backdrop />}
                {productFilterState && <Modal title="Filter Options" btnText="Apply" canCancel canConfirm onCancel={filterProductModalDismissHandler} onConfirm={filterProductModalConfirmHandler}>
                    {/* Form for filtering products */}
                    <form className='form-control text-center font-mont-alt text-lg text-slate border-grey border-1 items-stretch'>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="location">Location:</label>
                            </div>
                            <div>
                                <select className="form-select flex-1 m-1 shadow font-mont-alt text-slate text-sm w-80" name="location" id="filter-location" onChange={handleProductFilters}>
                                    {filterProducts().map((product) => (
                                        <option
                                            key={product._id} value={product.location}>
                                            {product.location}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="size">Size:</label>
                            </div>
                            <div>
                                <select className="form-select flex-1 m-1 shadow font-mont-alt text-slate text-sm w-80" name="size" id="filter-size" onChange={handleProductFilters}>
                                    {filterProducts().map((product) => (
                                        <option
                                            key={product._id} value={product.size}>
                                            {product.size}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="colour">Colour:</label>
                            </div>
                            <div>
                                <select className="form-select flex-1 m-1 shadow font-mont-alt text-slate text-sm w-80" name="colour" id="filter-colour" onChange={handleProductFilters}>
                                    {filterProducts().map((product) => (
                                        <option
                                            key={product._id} value={product.colour}>
                                            {product.colour}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                </Modal>}
                <div className="float-right">
                    <button className="p-2 px-4 bg-pink rounded-md font-satisfy text-center text-slate text-4xl" onClick={handleFilterProductBtn}>Filter</button>
                </div>
                {filterProducts().map((product) => (
                    <div className='container flex-1 mb-5' key={product._id}>
                        <Link to={`/products/${product._id}`}>
                            <div className='container relative mb-1'>
                                <div>
                                    <img src={product.image} className="w-full h-64 object-cover object-center border-mauve border-4" title={product.name} alt="product image">{`${console.log(product.tags)}`}</img>
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
                            <Link to={`/products/${product._id}`}>
                                <h6 className='text-3xl font-semibold'>{product.name}</h6>
                            </Link>
                            <Link to={`/users/${product.owner}`}>
                                <div className='flex items-center'>
                                    <UserIcon className='block fill-pink h-6 w-6'></UserIcon>
                                    <p className='px-2 text-2xl'>{product.owner}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </React.Fragment>
        </div>

    );
}

export default Product;