import React from "react";
import Products from "../components/Products";
import { Link } from "react-router-dom";
import { UserIcon } from '@heroicons/react/24/solid';

const User = () => {
    function friendAction() {
        if (Auth.loggedIn()) {
            return (
                <div className="float-left">
                    <button className="p-2 px-4 bg-pink rounded-md font-satisfy text-center text-slate text-4xl" href="#" id="add-friend">Add Friend</button>
                </div>

            );
        } else {
            return (
                <div className="float-left">
                    <button className="p-2 px-4 bg-pink rounded-md font-satisfy text-center text-slate text-4xl" href="#" id="remove-friend">Remove Friend</button>
                </div>

            );

        }
    }
    return (
        <div className="w-screen p-5 pb-10">
            <div className="flex flex-col float-left">
                <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center px-3">
                    <div className="flex flex-col  sm:flex-row justify-center md:justify-between items-center">
                        <div className="p-5 text-center sm:text-left float-left">
                            <div className='flex items-center'>
                                <UserIcon className='block fill-pink h-6 w-6'></UserIcon>
                                <h4 className='pl-1 font-satisfy text-xl md:text-2xl lg:text-3xl text-slate'>Username</h4>
                            </div>
                        </div>
                        <div className="block float-right">
                            <h6 className="px-1 mx-1 font-mont-alt text-slate text-xs md:text-sm lg:text-lg hover:font-bold">
                                <Link to="/booking-history">
                                    View Booking History
                                </Link>
                            </h6>
                        </div>
                    </div>
                    {friendAction()}
                </div>
                <div className="flex pb-5 p-5">
                    <Products />
                </div>
            </div>
        </div>

    );
};

export default User;