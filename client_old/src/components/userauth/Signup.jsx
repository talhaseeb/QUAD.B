import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usertype, setUsertype] = useState("normal");

    const handleSubmit = (e) => {
        e.preventDefault();
        let userObj = {
            email: email,
            password: password,
            isPartner: usertype == "partner" ? true : false
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
                >Signup</div>
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
                    <div className='flex flex-col items-start w-fit gap-y-1'>
                        <div className='text-gray-400'>User Type</div>
                        <select
                            name="usertype"
                            id="usertype"
                            value={usertype}
                            onChange={e => setUsertype(e.target.value)}
                            className='bg-gray-200 text-gray-900 px-3 py-1.5 rounded w-72'
                            required
                        >
                            <option
                                value="normal"
                                className='bg-gray-200 text-gray-900 px-3 py-1.5 rounded w-72'
                            >
                                Normal
                            </option>
                            <option
                                value="partner"
                                className='bg-gray-200 text-gray-900 px-3 py-1.5 rounded w-72'
                            >
                                Partner
                            </option>
                        </select>
                    </div>
                    <button
                        type='submit'
                        className='bg-gray-200 py-1.5 mt-4 !rounded text-gray-800 w-72'
                    >
                        Signup
                    </button>
                </form>
                <div className='text-xs mt-2 leading-none'>OR</div>
                <div className='flex items-center gap-x-1'>
                    Don't have an account?
                    <Link
                        to={'/signin'}
                        className='text-blue-400 tracking-wide font-normal hover:text-blue-300'
                    >
                        Signin
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup