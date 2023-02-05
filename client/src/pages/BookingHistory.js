import React from "react";
import History from "../components/Products";
import { Link } from "react-router-dom";
import { UserIcon } from '@heroicons/react/24/solid';

const BookingHistory = () => {
    return (
        <div className="w-screenp-5 pb-10">
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
                                <Link to="/profile">
                                    Back to Profile
                                </Link>
                            </h6>
                        </div>
                    </div>
                </div>
                <div className="float-left">
                        <h5 className='pl-1 font-satisfy text-lg md:text-xl lg:text-2xl text-mauve'>Upcoming</h5>
                    </div>
                <div className="flex pb-5 p-5">
                    <History />
                </div>
                <div className="float-left">
                        <h5 className='pl-1 font-satisfy text-lg md:text-xl lg:text-2xl text-mauve'>Previous</h5>
                    </div>
                <div className="flex pb-5 p-5">
                    <History />
                </div>
            </div>
            <div className="float-center flex flex-col border-grey border-t p-5 justify-center">
                <div className="p-5 text-center sm:text-left float-left">
                    <h2 className="font-satisfy text-lg sm:text-3xl lg:text-5xl text-slate">
                        Friends
                    </h2>
                </div>
                <div>
                    <ul className="flex flex-row flex-wrap mb-5 font-mont-alt items-center justify-start text-sm text-center text-slate p-5">
                        <li className="border-mauve flex items-center justify-center border p-2 px-3 m-1 rounded-xl hover:bg-grey hover:bg-opacity-10 hover:font-bold hover:border-2">
                            <Link to="/user"><UserIcon className='block float-left fill-mauve h-6 w-6'></UserIcon>Friend
                            </Link>
                        </li>
                        <li className="border-mauve flex items-center justify-center border p-2 px-3 m-1 rounded-xl hover:bg-grey hover:bg-opacity-10 hover:font-bold hover:border-2">
                            <Link to="/user"><UserIcon className='block float-left fill-mauve h-6 w-6'></UserIcon>Friend
                            </Link>
                        </li>
                        <li className="border-mauve flex items-center justify-center border p-2 px-3 m-1 rounded-xl hover:bg-grey hover:bg-opacity-10 hover:font-bold hover:border-2">
                            <Link to="/user"><UserIcon className='block float-left fill-mauve h-6 w-6'></UserIcon>Friend
                            </Link>
                        </li>
                        <li className="border-mauve flex items-center justify-center border p-2 px-3 m-1 rounded-xl hover:bg-grey hover:bg-opacity-10 hover:font-bold hover:border-2">
                            <Link to="/user"><UserIcon className='block float-left fill-mauve h-6 w-6'></UserIcon>Friend
                            </Link>
                        </li>
                        <li className="border-mauve flex items-center justify-center border p-2 px-3 m-1 rounded-xl hover:bg-grey hover:bg-opacity-10 hover:font-bold hover:border-2">
                            <Link to="/user"><UserIcon className='block float-left fill-mauve h-6 w-6'></UserIcon>Friend
                            </Link>
                        </li>
                        <li className="border-mauve flex items-center justify-center border p-2 px-3 m-1 rounded-xl hover:bg-grey hover:bg-opacity-10 hover:font-bold hover:border-2">
                            <Link to="/user"><UserIcon className='block float-left fill-mauve h-6 w-6'></UserIcon>Friend
                            </Link>
                        </li>
                        <li className="border-mauve flex items-center justify-center border p-2 px-3 m-1 rounded-xl hover:bg-grey hover:bg-opacity-10 hover:font-bold hover:border-2">
                            <Link to="/user"><UserIcon className='block float-left fill-mauve h-6 w-6'></UserIcon>Friend
                            </Link>
                        </li>
                        <li className="border-mauve flex items-center justify-center border p-2 px-3 m-1 rounded-xl hover:bg-grey hover:bg-opacity-10 hover:font-bold hover:border-2">
                            <Link to="/user"><UserIcon className='block float-left fill-mauve h-6 w-6'></UserIcon>Friend
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default BookingHistory;