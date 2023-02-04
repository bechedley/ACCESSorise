import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShareIcon, HeartIcon, UserIcon } from '@heroicons/react/24/solid';
import Auth from '../utils/auth';

const Login = () => {
    return (
        <div className="container p-5 h-full w-full">
            <div className='flex-col justify-center border-grey border-1 mb-10'>
                <h2 className='font-satisfy text-5xl text-slate text-center p-5'>Log Into Account</h2>
                <div className='flex-col block justify-center'>
                    <form className='text-center font-mont-alt text-lg text-slate border-grey border-1'>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label htmlFor="username">Email:</label>
                            </div>
                            <div>
                                <input type='email' className="flex-1 m-1" name="email" id="email" placeholder='email'></input>
                            </div>
                        </div>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label htmlFor="username">Password:</label>
                            </div>
                            <div>
                                <input type='password' className="flex-1 m-1" name="password" id="pwd" placeholder='password'></input>
                            </div>
                        </div>
                        <div className="float-center p-5">
                            <button type="submit" className="p-2 px-4 bg-pink rounded-md font-satisfy text-center text-slate text-3xl" href="#">Login</button>
                        </div>
                    </form>
                </div>
                <div className='flex justify-center'>
                    <Link to="/signup" className='text-center text-slate text-lg font-mont-alt'>← Sign Up for an Account</Link>
                </div>
            </div>

        </div>

    );
};

export default Login;