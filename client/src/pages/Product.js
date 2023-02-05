import React, { useEffect, useState } from "react";
import { ShareIcon, HeartIcon, UserIcon } from '@heroicons/react/24/solid';
import Gallery from "../components/Gallery";
import { useQuery } from '@apollo/client';
import { Link, useParams } from "react-router-dom";
import Auth from "../utils/auth";
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

const Product = () => {
    const [state, dispatch] = useStoreContext();
    const { id } = useParams();

    const [currentProduct, setCurrentProduct] = useState({});

  const { products } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.findbyPk((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const tags = currentProduct.tags;
  const tagsArray = tags.pop(',');

    return (
        <div className="w-screen min-h-screen p-5 grid grid-cols-1 md:grid-cols-2">
            <div className="float-left p-5">
                <div className="mb-2">
                    <img src={`${currentProduct.image}`} alt={currentProduct.name}></img>
                </div>
                <div className="">
                    <Gallery {...currentProduct} />
                </div>
            </div>
            <div className="float-right p-5">
                <div className="flex justify-center items-center">
                    <div>
                        <h1 className="font-satisfy text-7xl text-slate text-center">{currentProduct.name}</h1>
                    </div>
                    <Link to="/share">
                        <ShareIcon className="h-10 lg:h-12 w-10 lg:w-12 fill-slate ml-3" />
                    </Link>
                </div>
                <div className='flex items-center justify-center my-2.5'>
                    <UserIcon className='block fill-pink h-6 w-6'></UserIcon>
                    <h6 className='px-2 text-lg'>{currentProduct.owner}</h6>
                </div>
                <div className="text-left my-5">
                    <p className="font-mont-alt text-slate text-lg">{currentProduct.description}</p>
                </div>
                <div className="float-center pb-5">
                        <ul className="flex flex-row justify-between text-center list-none text-xl text-slate font-mont-alt uppercase border-r border-l border-grey divide-x divide-grey">
                            <li className="px-3">{currentProduct.location}</li> 
                            <li className="px-3">Size: {currentProduct.size}</li>
                            <li className="px-3">Colour: {currentProduct.colour}</li>
                            <li className={!currentProduct.deposit ? 'hidden px-3' : 'block px-3'}>Deposit: {currentProduct.deposit}</li>
                        </ul>
                    </div>
                <div>
                    <div className="flex flex-col float-left">
                        <div className="float-left block">
                            <button className="p-2 my-4 px-6 bg-blue rounded-md font-satisfy text-center text-slate text-4xl" pid={currentProduct._id}>Book</button>
                        </div>
                        <div className="float-left block">
                            <button className="p-2 my-4 px-6 bg-blue rounded-md font-satisfy text-center text-slate text-4xl" pid={currentProduct._id}>
                                <span><HeartIcon className={Auth.loggedIn() === true ? 'fill-mauve h-6 w-6 mr-1' : 'fill-slate h-6 w-6 mr-1'}></HeartIcon>Favourite</span>
                            </button>
                        </div>
                        <div className="float-left block">
                            <button className="p-2 my-4 px-6 bg-blue rounded-md font-satisfy text-center text-slate text-4xl" uid={currentProduct.owner}>Ask a Question</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row block float-left mt-5">
                    <h6 className="font-mont-alt text-slate text-lg text-left">Tags:</h6>
                    <ul className="flex flex-row flex-wrap font-mont-alt items-center justify-start text-sm text-center text-slate">
                        {tagsArray.map((tag, index) => (
                        <li className="bg-pink p-1 px-3 m-1 uppercase rounded-full" key={index}>{tag} <button className="hidden border-none text-grey">X</button></li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Product;