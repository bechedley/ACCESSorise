import React, { useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Categories from "../components/Categories";
import Modal from "../components/Modal";
import Backdrop from "../components/Backdrop";

const Home = () => {
    const [searchState, setSearchState] = useState(false);

    const handleSearchStart = () => {
        setSearchState(true);
    };

    const searchModalConfirmHandler = () => {
        setSearchState(false);
    }

    const searchModalDismissHandler = () => {
        setSearchState(false);
    }

    return (
        <div className="p-5 w-screen min-h-screen">
            <React.Fragment>
                {searchState && <Backdrop />}
                {searchState && <Modal title="Search" btnText="Search" canCancel canConfirm onCancel={searchModalDismissHandler} onConfirm={searchModalConfirmHandler}>
                    <form>
                    <MagnifyingGlassIcon className="block m-2 float-left h-6 lg:h-8 w-6 lg:w-8 fill-slate" />
                    <input className="font-mont-alt text-slate" type="text" name="search" placeholder="search"></input>
                    </form>
                </Modal>}
                <div className="container flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center px-3">
                    <div className="container p-5 text-center sm:text-left float-left sm:float-left">
                        <h2 className="font-satisfy text-sm sm:text-lg md:text-2xl lg:text-5xl text-slate">
                            Find the perfect finishing touch...
                        </h2>
                    </div>

                    <div className="float-right">
                        <button className="p-2 px-4 bg-pink rounded-md font-satisfy text-center text-slate text-4xl" onClick={handleSearchStart}>Search</button>
                    </div>
                </div>
                <div className="container">
                    <Categories />
                </div>
            </React.Fragment>
        </div>
    );
};

export default Home;
