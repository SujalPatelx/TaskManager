'use client'
import { describe } from 'node:test'
import React, { ChangeEvent, FormEvent, useState } from 'react'

export default function TaskInput() {

    type formdata = {
        title: string,
        description: string
    }

    const [formdata, setFormdata] = useState<formdata>({
        title: '',
        description: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormdata((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    return (
        <div className='w-full bg-gray-200 rounded-2xl'>
            <div className='w-full h-full p-10 flex flex-col items-center justify-center gap-6'>
                <p className='text-4xl font-semibold text-blue-500'>Add New Task</p>
                <form className='w-full flex flex-col gap-6 items-center justify-center'>
                    <div className='w-full max-w-md'>
                        <label htmlFor="tasktitle" className='text-xl font-normal'>Task Title :</label>
                        <input onChange={handleChange} type="text" name='tasktitle' id='tasktitle' placeholder='Task Title' className='p-2 bg-gray-300 rounded-lg w-full' />
                    </div>
                    <div className='w-full max-w-md'>
                        <label htmlFor="taskdes" className='text-xl font-normal'>Task Description :</label>
                        <input type="text" name='taskdes' id='taskdes' placeholder='Task Description' className='p-2 bg-gray-300 rounded-lg w-full' />
                    </div>
                    <div className='w-full max-w-md'>
                        <button onSubmit={handleSubmit} className='p-2 bg-blue-400 rounded-lg w-full'>Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
