import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { HeartIcon, UserIcon } from '@heroicons/react/24/solid';
import Auth from "../../utils/auth";

const HistoryProduct = (props) => {
    // function showButton() {
    //     if (Auth.loggedIn() ) {
    //         <div className='absolute w-full bg-transparent bottom-px left-px items-end justify-end'>
    //         <div className='w-full justify-center items-center transition duration-300 ease-in-out hover:scale-110'>
    //             <button className='w-full bg-pink font-mont-alt text-lg p-3 py-3 border-2 border-mauve' id="borrower-return">Mark Returned</button>
    //         </div>
    //     </div>
    //     } else {
    //         <div></div>
    //     };

    return (
        <div className='container flex-1 mb-5'>
            <Link to={`/products/${props._id}`}>
                <div className='container relative mb-1'>
                    <div>
                        <a href="#" alt="product-page">
                            <img src={props.img} className="w-full h-64 object-cover object-center border-mauve border-4" title={props.name} alt="product image"></img>
                        </a>
                    </div>

                    {/* Mark Returned Button = logged in and booked and past */}
                    {/* <div className='absolute w-full bg-transparent bottom-px left-px items-end justify-end'>
                    <div className='w-full justify-center items-center transition duration-300 ease-in-out hover:scale-110'>
                        <button className='w-full bg-pink font-mont-alt text-lg p-3 py-3 border-2 border-mauve' id="borrower-return">Mark Returned</button>
                    </div>
                </div> */}
                    {/* Completed Button = logged in and booked and completed */}
                    {/* <div className='absolute w-full bg-transparent bottom-px left-px items-end justify-end'>
                    <div className='w-full justify-center items-center transition duration-300 ease-in-out hover:scale-110'>
                        <button className='disabled w-full bg-blue font-mont-alt text-lg p-3 py-3 border-2 border-mauve text-grey' id="btn-completed">Returned DATE</button>
                    </div>
                </div> */}
                    {/* Edit Button = logged in and booked and upcoming and creator */}
                    <div className='absolute w-full bg-transparent bottom-px left-px items-end justify-end'>
                        <div className='w-full justify-center items-center transition duration-300 ease-in-out hover:scale-110'>
                            <button className='w-full bg-blue font-mont-alt text-lg p-3 py-3 border-2 border-mauve' id="edit-booking">Edit Booking</button>
                        </div>
                    </div>
                </div>
            </Link>
            <div className='font-mont-alt text-left text-slate'>
                <Link to={`/products/${props._id}`}>
                    <h6 className='text-3xl font-semibold'>{props.name}</h6>
                </Link>
                <Link to={`/users/${props.owner}`}>
                    <div className='flex items-center'>
                        <UserIcon className='block fill-pink h-6 w-6'></UserIcon>
                        <p className='px-2 text-2xl'>{props.owner}</p>
                    </div>
                </Link>
            </div>
        </div >

    );
}

export default HistoryProduct;