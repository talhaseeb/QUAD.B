import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div
            className='h-16 px-6 flex items-center justify-between gap-x-6 border-b border-b-gray-500'
        >
            <Link
                to={"/"}
                className='text-blue-300 tracking-widest hover:text-gray-200'
            >
                QUAD.B
            </Link>
            <div
                className='flex items-center justify-center gap-x-6'
            >
                <Link
                    to={'/'}
                    className='text-blue-300 tracking-wide font-normal hover:text-gray-200'
                >
                    About
                </Link>
                <Link
                    to={'/'}
                    className='text-blue-300 tracking-wide font-normal hover:text-gray-200'
                >
                    Contact
                </Link>
                <Link
                    to={'/signin'}
                    className='text-blue-300 tracking-wide font-normal hover:text-gray-200'
                >
                    Signin
                </Link>
                <Link
                    to={'/signup'}
                    className='text-blue-300 tracking-wide font-normal hover:text-gray-200'
                >
                    Signup
                </Link>
                <Link
                    to={'/'}
                    className='text-blue-300 tracking-wide font-normal hover:text-gray-200'
                >
                    Guest
                </Link>
            </div>
        </div>
    )
}

export default Navbar