import React, { useState, useEffect } from "react";
import History from "../components/History";
import { Link, useParams } from "react-router-dom";
import { useStoreContext } from '../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { UPDATE_BOOKINGS, UPDATE_PRODUCTS, UPDATE_CURRENT_PRODUCT, UPDATE_CURRENT_USER } from '../utils/actions';
import { QUERY_USERS, QUERY_PRODUCTS, QUERY_BOOKINGS } from '../utils/queries';
import { UserIcon } from '@heroicons/react/24/solid';
import { idbPromise } from '../utils/helpers';

const BookingHistory = () => {
    const [state, dispatch] = useStoreContext();
    const { id } = useParams();
  
    const { users } = state;
    const { products } = state;
    const { bookings } = state;

    const { currentUser } = state;

    const { loadingProducts, dataProducts } = useQuery(QUERY_PRODUCTS);

    const { loading, data } = useQuery(QUERY_BOOKINGS);

    useEffect(() => {
        if (data) {
          dispatch({
            type: UPDATE_BOOKINGS,
            bookings: data.bookings,
          });
          data.bookings.forEach((booking) => {
            idbPromise('bookings', 'put', booking);
          });
        } else if (!loading) {
          idbPromise('bookings', 'get').then((booking) => {
            dispatch({
              type: UPDATE_BOOKINGS,
              bookings: bookings,
            });
          });
        }
      }, [data, loading, dispatch], 0);
    
      useEffect(() => {
        if (dataProducts) {
          dispatch({
            type: UPDATE_PRODUCTS,
            categories: data.products,
          });
          data.products.forEach((product) => {
            idbPromise('products', 'put', product);
          });
        } else if (!loadingProducts) {
          idbPromise('products', 'get').then((product) => {
            dispatch({
              type: UPDATE_PRODUCTS,
              products: products,
            });
          });
        }
      }, [products, dataProducts, loadingProducts, dispatch, id], 0);

    const filterBookings = () => {
      return state.bookings.filter(
        (bookings) => bookings.creator === currentUser
      );
    }

    const handleProductClick = (id) => {
        dispatch({
            type: UPDATE_CURRENT_PRODUCT,
            currentProduct: id,
        });
    };

    const handleOwnerClick = (id) => {
        dispatch({
            type: UPDATE_CURRENT_USER,
            currentUser: id,
        });
    };

    return (
        <div className="w-screen min-h-screen p-5 pb-10">
            <div className="flex flex-col float-left">
                <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center px-3">
                    <div className="flex flex-col  sm:flex-row justify-center md:justify-between items-center">
                        <div className="p-5 text-center sm:text-left float-left">
                            <div className='flex items-center'>
                                <h4 className='pl-1 font-satisfy text-xl md:text-2xl lg:text-3xl text-slate'>Booking History</h4>
                            </div>
                        </div>
                        <div className="block float-right">
                            <h6 className="px-1 mx-1 font-mont-alt text-slate text-xs md:text-sm lg:text-lg hover:font-bold">
                                <Link to="/me">
                                    Back to Profile
                                </Link>
                            </h6>
                        </div>
                    </div>
                </div>
                <div className="float-left">
                        <h5 className='mx-10 font-satisfy text-xl md:text-2xl lg:text-4xl text-mauve'>Upcoming</h5>
                    </div>
                <div className="flex pb-5 p-5">
                {filterBookings().map((booking) => (
                                    <div className='container flex-1 mb-5' key={booking._id}>
                                    <Link to={`/products/${booking.product._id}`} onClick={() => {
                                        handleProductClick(`${booking.product._id}`);
                                    }}>
                                        <div className='container relative mb-1'>
                                            <div>
                                                <img src={booking.product.image} className="w-full h-64 object-cover object-center border-mauve border-4" title={booking.product.name} alt="product image"></img>
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
                                        <Link to={`/products/${booking.product._id}`} onClick={() => {
                                            handleProductClick(`${booking.product._id}`);
                                        }}>
                                            <h6 className='text-3xl font-semibold'>{booking.product.name}</h6>
                                        </Link>
                                        <Link to={`/users/${booking.product.owner}`} onClick={() => {
                                            handleOwnerClick(`${booking.product.owner}`);
                                        }}>
                                            <div className='flex items-center'>
                                                <UserIcon className='block fill-pink h-6 w-6'></UserIcon>
                                                <p className='px-2 text-2xl'>{booking.product.owner}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                ))}
                </div>
                <div className="float-left">
                        <h5 className='mx-10 font-satisfy text-xl md:text-2xl lg:text-4xl text-mauve'>Previous</h5>
                    </div>
                <div className="flex pb-5 p-5">
                    <History />
                </div>
            </div>
            <div className="float-center flex flex-col border-grey border-t p-5 justify-center">
                        <div className="p-5 text-center sm:text-left float-left">

                        </div>
                        <div>
                
                        </div>
                    </div>
        </div>

    );
};

export default BookingHistory;