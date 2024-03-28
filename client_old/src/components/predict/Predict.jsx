import React from 'react'

function Predict() {
    return (
        <div
            className='h-full w-full flex items-center justify-center flex-col gap-y-4'
        >
            <div className='flex flex-col gap-y-4'>
                <div
                    className='flex items-center gap-x-4'
                >
                    <div className='text-xl leading-none'>Number of Guests</div>
                    <input
                        type="number"
                        className='bg-gray-200 text-gray-800 px-2 py-1 rounded w-56'
                    />
                </div>
                <div
                    className='flex items-center gap-x-4'
                >
                    <div className='text-xl leading-none'>Quantity of Food</div>
                    <input
                        type="number"
                        className='bg-gray-200 text-gray-800 px-2 py-1 rounded w-56'
                    />
                </div>
                <div
                    className='flex items-center gap-x-4'
                >
                    <div className='text-xl leading-none'>Type of Food</div>
                    <input
                        type="number"
                        className='bg-gray-200 text-gray-800 px-2 py-1 rounded w-56'
                    />
                </div>
                <div
                    className='flex items-center gap-x-4'
                >
                    <div className='text-xl leading-none'>Event Type</div>
                    <input
                        type="number"
                        className='bg-gray-200 text-gray-800 px-2 py-1 rounded w-56'
                    />
                </div>
                <div
                    className='flex items-center gap-x-4'
                >
                    <div className='text-xl leading-none'>Storage Conditions</div>
                    <input
                        type="number"
                        className='bg-gray-200 text-gray-800 px-2 py-1 rounded w-56'
                    />
                </div>
            </div>
        </div>
    )
}

export default Predict