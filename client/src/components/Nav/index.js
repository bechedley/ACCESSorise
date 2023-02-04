import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { UserCircleIcon, HeartIcon, CalendarDaysIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import logo from '../../assets/images/accessorise-logo-shoe.png'
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";


function Nav() {

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul className="flex flex-row list-none lg:ml-auto">
                    <li className="mx-1">
                        <Link to="/search">
                            <MagnifyingGlassIcon className="h-6 lg:h-8 w-6 lg:w-8 fill-slate" />
                        </Link>
                    </li>
                    <li className="mx-1">
                        <Link to="/bookings">
                            <CalendarDaysIcon className="h-6 lg:h-8 w-6 lg:w-8 fill-slate" />
                        </Link>
                    </li>
                    <li className="mx-1">
                        <Link to="/favourites">
                            <HeartIcon className="h-6 lg:h-8 w-6 lg:w-8 fill-slate" />
                        </Link>
                    </li>
                    <li className="mx-1">
                        <Link to="/profile">
                            <UserCircleIcon className="h-6 lg:h-8 w-6 lg:w-8 fill-slate" />
                        </Link>
                    </li>
                    <li className="mx-1 font-mont-alt text-slate text-xs md:text-sm lg:text-lg hover:font-bold">
                        {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                        <a href="/" onClick={() => Auth.logout()}>
                            Logout
                        </a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="flex flex-row list-none lg:ml-auto">
                    <li className="mx-1 font-mont-alt text-slate text-xs md:text-sm lg:text-lg hover:font-bold">
                        <Link to="/signup">
                            Signup
                        </Link>
                    </li>
                    <li className="mx-1 font-mont-alt text-slate text-xs md:text-sm lg:text-lg hover:font-bold">
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            );
        }
    }

    return (
        <nav className="bg-blue relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between w-auto block lg:justify-start">
                    <ul className="flex flex-row list-none lg:ml-auto items-center">
                        <li className="mx-1">
                            <Link to="/">
                                <img src={logo} className="block h-8 w-auto" title="Accessorise logo" alt="accessorise" />
                            </Link>
                        </li>
                        <li className="mx-1">
                            <Link to="/">
                                <h1 className='hidden sm:block text-slate font-satisfy p-2 lg:text-4xl sm:text-sm md:text-lg'>ACCESSorise</h1>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className='float-right'>
                    {showNavigation()}
                </div>
            </div>
        </nav>
    );
}

export default Nav;