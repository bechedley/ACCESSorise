import React, { useState } from 'react';
import { galleryData } from '../../data';

const Gallery = () => {

    return (
        <div className='container overflow-x-auto my-2.5 width-full h-44 flex bg-grey bg-opacity-10 relative justify-between'>
            <div className='h-44 flex items-center justify-between gap-4 p-2 transition-all ease-in-out delay-300'>
                {galleryData.map(item=>(
                <div className='flex items-center justify-center'
                key={item.id}>
                    <div className='flex-1 items-center justify-center w-44'>
                        <img src={item.img} alt="alt-product-image" className='h-32 w-auto object-cover object-center'></img>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default Gallery;