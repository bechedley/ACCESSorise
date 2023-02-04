import React from 'react'
import { ShareIcon, HeartIcon, CalendarDaysIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import logo from '../../assets/images/accessorise-logo-shoe.png'
import { Link } from "react-router-dom";


function Footer() {

    return (
        <footer className="bg-grey relative flex flex-wrap items-center justify-between px-3 py-4 pb-5 w-screen">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between w-auto block lg:justify-start">
                    <ul className="flex flex-col list-none lg:ml-auto text-left">
                    <li className="mx-1 font-mont-alt text-slate text-xs md:text-sm lg:text-lg hover:font-bold">
                        <Link to="/policies">
                            Our policies
                        </Link>
                    </li>
                    <li className="mx-1 font-mont-alt text-slate text-xs md:text-sm lg:text-lg hover:font-bold">
                        <Link to="/contact">
                            Get in touch
                        </Link>
                    </li>
                    <li className="mx-1 font-mont-alt text-slate text-xs md:text-sm lg:text-lg hover:font-bold">
                        <Link to="/process">
                            How it works
                        </Link>
                    </li>
                    </ul>
                </div>

                <div className='float-right'>
                <ul className="flex flex-row list-none lg:ml-auto">
                    <li className="mx-1">
                        <Link to="/share">
                            <ShareIcon className="h-6 lg:h-8 w-6 lg:w-8 fill-slate" />
                        </Link>
                    </li>
                </ul>        
                </div>
            </div>
        </footer>
    );
}

export default Footer;