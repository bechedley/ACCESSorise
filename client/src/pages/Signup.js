import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

const Signup = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
        ...formState,
        [name]: value,
    });
};

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

    return (
        <div className="w-screen p-5 min-h-screen">
            <div className='flex-col justify-center border-grey border-1 mb-10'>
                <h2 className='font-satisfy text-5xl text-mauve text-center p-5'>Create an Account</h2>
                <div className='flex-col block justify-center'>
                    <form className='text-center font-mont-alt text-lg text-slate border-grey border-1' onSubmit={handleFormSubmit}>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="username">Username:</label>
                            </div>
                            <div>
                                <input type='text' className="shadow flex-1 m-1 font-mont-alt text-slate text-sm" name="username" id="username" placeholder='username' onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="email">Email:</label>
                            </div>
                            <div>
                                <input type='email' className="shadow flex-1 m-1 font-mont-alt text-slate text-sm" name="email" id="email" placeholder='email' onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className='flex-row space-between p-2'>
                            <div>
                                <label className="font-satisfy text-mauve text-xl" htmlFor="password">Password:</label>
                            </div>
                            <div>
                                <input type='password' className="shadow flex-1 m-1 font-mont-alt text-slate text-sm" name="password" id="pwd" placeholder='password' onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="float-center p-5">
                            <button type="submit" className="p-2 px-4 bg-blue rounded-md font-satisfy text-center text-slate text-3xl" href="#">Create Account</button>
                        </div>
                    </form>
                </div>
                <div className='flex justify-center'>
                    <Link to="/login" className='text-center text-slate text-lg font-mont-alt'>← Go to Login</Link>
                </div>
            </div>

        </div>

    );
};

export default Signup;