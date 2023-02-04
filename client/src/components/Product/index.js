import { useState } from 'react';
import { Link } from "react-router-dom";
import { HeartIcon, UserIcon } from '@heroicons/react/24/solid'
import Auth from "../../utils/auth";

const Product = (props) => {
    return (
        <div className='container flex-1 mb-2'>
            <div className='container relative mb-1'>
            <div>
                <a href="#" alt="product-page">
                    <img src={props.img} className="w-full h-64 object-cover object-center border-mauve border-4" title={props.name} alt="product image"></img>
                </a>
            </div>
            <div className='absolute bg-transparent bottom-px right-px items-end justify-end'>
                <div className='w10 h10 m-1 p-1 rounded-full bg-white border-mauve border-2 justify-center items-center transition duration-300 ease-in-out hover:scale-110'>
            <HeartIcon className={Auth.loggedIn() === true ? 'block fill-mauve h-4 w-4' : 'block fill-slate h-4 w-4'}></HeartIcon>
                </div>
            </div>
            </div>
            <div className='font-mont-alt text-left text-slate'>
                <h6 className='text-3xl font-semibold'>{props.name}</h6>
                <div className='flex items-center'>
                <UserIcon className='block fill-pink h-6 w-6'></UserIcon>
                <p className='px-2 text-2xl'>{props.owner}</p>
                </div>
            </div>
        </div>

    );
}

export default Product;