import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Signin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let userObj = {
            email: email,
            password: password
        };
        console.log(userObj);
    }

    return (
        <div
            className='h-full w-full flex items-center justify-center flex-col gap-y-4'
        >
            <div
                className='flex items-center justify-center flex-col gap-y-4 p-6 rounded-md shadow-md bg-[#0006]'
            >
                <div
                    className='border-b border-b-gray-300 pb-4 text-2xl leading-none w-72 text-center font-semibold tracking-wider'
                >Signin</div>
                <form
                    className='w-full flex items-center justify-center flex-col gap-y-3'
                    onSubmit={handleSubmit}
                >
                    <div className='flex flex-col items-start w-fit gap-y-1'>
                        <div className='text-gray-400'>Email</div>
                        <input
                            type="email"
                            className='bg-gray-200 text-gray-800 px-3 py-1.5 rounded w-72'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='johndoe@gmail.com'
                            required
                        />
                    </div>
                    <div className='flex flex-col items-start w-fit gap-y-1'>
                        <div className='text-gray-400'>Password</div>
                        <input
                            type="password"
                            className='bg-gray-200 text-gray-800 px-3 py-1.5 rounded w-72'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder='password...'
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='bg-gray-200 py-1.5 mt-4 !rounded text-gray-800 w-72'
                    >
                        Signin
                    </button>
                </form>
                <div className='text-xs mt-2 leading-none'>OR</div>
                <div className='flex items-center gap-x-1'>
                    Don't have an account?
                    <Link
                        to={'/signup'}
                        className='text-blue-400 tracking-wide font-normal hover:text-blue-300'
                    >
                        Signup
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signin