'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'

type submiteType = {
    submite: (task: { taskTitle: string, taskDes: string }) => void
}

export default function TaskInput({ submite }: submiteType) {

    type formDataType = {
        title: string,
        description: string
    }

    const [formdata, setFormdata] = useState<formDataType>({
        title: '',
        description: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormdata((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submite({ taskTitle: formdata.title, taskDes: formdata.description })
    }

    return (

        <div className='w-full bg-gray-200 rounded-2xl'>
            <div className='w-full h-full p-10 flex flex-col items-center justify-center gap-6'>
                <p className='text-4xl font-semibold text-blue-500'>Add New Task</p>
                <form className='w-full flex flex-col gap-6 items-center justify-center' onSubmit={handleSubmit}>
                    <div className='w-full max-w-md'>
                        <label htmlFor="tasktitle" className='text-xl font-normal'>Task Title :</label>
                        <input onChange={handleChange} type="text" name='tasktitle' id='tasktitle' placeholder='Task Title' className='p-2 bg-gray-300 rounded-lg w-full' />
                    </div>
                    <div className='w-full max-w-md'>
                        <label htmlFor="taskdes" className='text-xl font-normal'>Task Description :</label>
                        <input type="text" name='taskdes' id='taskdes' placeholder='Task Description' className='p-2 bg-gray-300 rounded-lg w-full' />
                    </div>
                    <div className='w-full max-w-md'>
                        <button className='p-2 bg-blue-400 rounded-lg w-full'>Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
