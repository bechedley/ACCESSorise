import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { email: formState.email, password: formState.password },
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className="p-5 min-h-screen w-screen">
            <div className='flex-col justify-center border-grey border-1 mb-10'>
                <h2 className='font-satisfy text-5xl text-mauve text-center p-5'>Log Into Your Account</h2>
                <div className='flex-col block justify-center'>
                    <form onSubmit={handleFormSubmit} className='text-center font-mont-alt text-lg text-slate border-grey border-1'>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="email">Email:</label>
                            </div>
                            <div>
                                <input type='email' className="flex-1 m-1 shadow font-mont-alt text-slate text-sm" name="email" id="email" placeholder='email' onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="password">Password:</label>
                            </div>
                            <div>
                                <input type='password' className="flex-1 m-1 shadow font-mont-alt text-slate text-sm" name="password" id="pwd" placeholder='password' onChange={handleChange}></input>
                            </div>
                        </div>
                        {error ? (
                            <div>
                                <p className="font-mont-alt text-red">The provided credentials are incorrect</p>
                            </div>
                        ) : null}
                        <div className="float-center p-5">
                            <button type="submit" className="p-2 px-4 bg-blue rounded-md font-satisfy text-center text-slate text-3xl">Login</button>
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