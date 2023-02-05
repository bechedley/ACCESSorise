import React from "react";
import AllProducts from "../components/AllProducts";

const Favourites = () => {
    return (
        <div className="w-screen min-h-screen p-5">
            <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center px-3">
                <div className="container p-5 text-center sm:text-left float-left">
                    <h2 className="font-satisfy text-lg sm:text-3xl lg:text-5xl text-slate">
                        Favourites
                    </h2>
                </div>
                <div className="float-right">
                    <button className="p-2 px-4 bg-pink rounded-md font-satisfy text-center text-slate text-4xl" href="#">Filter</button>
                </div>
            </div>
            <div>
                <AllProducts />
            </div>
        </div>

    );
};

export default Favourites;