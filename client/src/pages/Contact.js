import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <div className="p-5 h-full w-screen">
            <div className='flex-col justify-center border-grey border-1 mb-10'>
                <h2 className='font-satisfy text-5xl text-mauve text-center p-5'>Get in Touch</h2>
                <div className='flex-col block justify-center'>
                    <form className='text-center font-mont-alt text-lg text-slate border-grey border-1'>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="name">Name:</label>
                            </div>
                            <div>
                                <input type='text' className="flex-1 m-1 shadow font-mont-alt text-slate text-sm" name="name" id="name" placeholder='name'></input>
                            </div>
                        </div>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="email">Email:</label>
                            </div>
                            <div>
                                <input type='email' className="flex-1 m-1 shadow font-mont-alt text-slate text-sm" name="email" id="email" placeholder='email'></input>
                            </div>
                        </div>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="message">Message:</label>
                            </div>
                            <div>
                                <textarea type='textarea' className="flex-1 m-1 h-36 shadow font-mont-alt text-slate text-sm" name="message" id="message" placeholder='write your message here' rows={4}></textarea>
                            </div>
                        </div>
                        <div className="float-center p-5">
                            <button type="submit" className="p-2 px-4 bg-blue rounded-md font-satisfy text-center text-slate text-3xl">Submit</button>
                        </div>
                    </form>
                </div>
                <div className='flex justify-center'>
                    <p className='text-center text-slate text-lg font-mont-alt'>We aim to respond within 5 business days. <br></br>Please keep an eye on your emails and double check your spam folder.</p>
                </div>
            </div>

        </div>

    );
};

export default Contact;