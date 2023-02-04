import React from "react";
import Categories from "../components/Categories";

const Home = () => {
    return (
        <div className="container p-5 w-full">
            <div className="flex justify-between items-center px-3">
                <div className="container p-5 text-left float-left">
                    <h2 className="font-satisfy text-sm sm:text-lg md:text-2xl lg:text-5xl text-slate">
                        Find the perfect finishing touch...
                    </h2>
                </div>
                <div className="float-right">
                    <button className="p-2 px-4 bg-pink rounded-md font-satisfy text-center text-slate text-4xl" href="#">Search</button>
                </div>
            </div>
            <div className="container">
                <Categories />
            </div>
        </div>
    );
};

export default Home;
