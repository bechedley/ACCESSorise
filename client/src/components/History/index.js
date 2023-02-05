import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { products } from '../../data';
import HistoryProduct from '../HistoryProduct';


function History() {

    return (
        <div className='container p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-3'>
            {products.map((productEach) => (
                <HistoryProduct {...productEach} key={productEach.id} />
            ))}
        </div>

    );
}

export default History;