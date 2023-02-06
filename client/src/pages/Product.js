import React from "react";
import { ShareIcon, HeartIcon, UserIcon } from '@heroicons/react/24/solid';
import Gallery from "../components/Gallery";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Product = () => {
    return (
        <div className="w-screen p-5 grid grid-cols-1 md:grid-cols-2">
            <div className="float-left p-5">
                <div className="mb-2">
                    <img src="https://images.pexels.com/photos/3682292/pexels-photo-3682292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full max-h-700px object-cover object-center" alt="product-image"></img>
                </div>
                <div className="">
                    <Gallery />
                </div>
            </div>
            <div className="float-right p-5">
                <div className="flex justify-center items-center">
                    <div>
                        <h1 className="font-satisfy text-7xl text-slate text-center">Product Name</h1>
                    </div>
                    <Link to="/share">
                        <ShareIcon className="h-10 lg:h-12 w-10 lg:w-12 fill-slate ml-3" />
                    </Link>
                </div>
                <div className='flex items-center justify-center my-2.5'>
                    <UserIcon className='block fill-pink h-6 w-6'></UserIcon>
                    <h6 className='px-2 text-lg'>Username</h6>
                </div>
                <div className="text-left my-5">
                    <p className="font-mont-alt text-slate text-lg">Product description, eg. Red satin high heels,
                        minimal wear. Comfortable for long events. 6cm
                        heel, open toe, strappy.</p>
                </div>
                <div className="float-center pb-5">
                        <ul className="flex flex-row justify-between text-center list-none text-xl text-slate font-mont-alt uppercase border-r border-l border-grey divide-x divide-grey">
                            <li className="px-3">Location</li> 
                            <li className="px-3">Size: size</li>
                            <li className="px-3">Colour</li>
                            <li className="px-3">Deposit: $30</li>
                        </ul>
                    </div>
                <div>
                    <div className="flex flex-col float-left">
                        <div className="float-left block">
                            <button className="p-2 my-4 px-6 bg-blue rounded-md font-satisfy text-center text-slate text-4xl" href="#">Book</button>
                        </div>
                        <div className="float-left block">
                            <button className="p-2 my-4 px-6 bg-blue rounded-md font-satisfy text-center text-slate text-4xl" href="#">
                                <span><HeartIcon className={Auth.loggedIn() === true ? 'fill-mauve h-6 w-6 mr-1' : 'fill-slate h-6 w-6 mr-1'}></HeartIcon>Favourite</span>
                            </button>
                        </div>
                        <div className="float-left block">
                            <button className="p-2 my-4 px-6 bg-blue rounded-md font-satisfy text-center text-slate text-4xl" href="#">Ask a Question</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row block float-left mt-5">
                    <h6 className="font-mont-alt text-slate text-lg text-left">Tags:</h6>
                    <ul className="flex flex-row flex-wrap font-mont-alt items-center justify-start text-sm text-center text-slate">
                        <li className="bg-pink p-1 px-3 m-1 uppercase rounded-full">Tag Name <button className="border-none text-grey">X</button></li>
                        <li className="bg-pink p-1 px-3 m-1 uppercase rounded-full">Tag Name <button className="border-none text-grey">X</button></li>
                        <li className="bg-pink p-1 px-3 m-1 uppercase rounded-full">Tag Name <button className="border-none text-grey">X</button></li>
                        <li className="bg-pink p-1 px-3 m-1 uppercase rounded-full">Tag Name <button className="border-none text-grey">X</button></li>
                        <li className="bg-pink p-1 px-3 m-1 uppercase rounded-full">Tag Name <button className="border-none text-grey">X</button></li>
                        <li className="bg-pink p-1 px-3 m-1 uppercase rounded-full">Tag Name <button className="border-none text-grey">X</button></li>
                        <li className="bg-pink p-1 px-3 m-1 uppercase rounded-full">Tag Name <button className="border-none text-grey">X</button></li>
                        <li className="bg-pink p-1 px-3 m-1 uppercase rounded-full">Tag Name <button className="border-none text-grey">X</button></li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Product;