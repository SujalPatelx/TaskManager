import React from 'react'

export default function TaskCard() {
    return (
        <div className='mt-20'>
            <div className='max-w-sm px-6 py-6 bg-gray-300 rounded-2xl'>
                <p className='text-2xl text-zinc-800'>Task Title</p>
                <p className='text-lg text-zinc-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius, similique.</p>
                <button className='mt-4 px-3 py-2 bg-blue-500 rounded-lg text-gray-100 cursor-pointer'>Done</button>
            </div>
        </div>
    )
}
