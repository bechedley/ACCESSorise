import React, { useState } from 'react';
import { Link } from "react-router-dom";

const CategoryItem = (props) => {
    return (
        <div className='container flex-1 relative mb-2'>
            <Link to={`/categories/${props.id}`}>
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