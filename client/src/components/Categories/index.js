import { useState } from 'react';
import { Link } from "react-router-dom";
import { categories } from '../../data';
import CategoryItem from '../CategoryItem';

function Categories() {

  return (
    <div className='container p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-3'>
      {categories.map((categoryEach) => (
        <CategoryItem {...categoryEach} key={categoryEach.id} />
      ))}
    </div>

  );
}

export default Categories;