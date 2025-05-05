'use client'
import axios from 'axios'
import React, { FormEvent, useEffect, useState } from 'react'
import TaskInput from './TaskInput'
import TaskCard from './TaskCard'

type props = {
    id: string
}

type userType = {
    username?: string
}
type task = {
    taskTitle: string,
    taskDes: string,
}
type allTasks = {
    taskTitle: string,
    taskDes: string,
    taskDate: string,
    isComplete: boolean,
    _id?: string
}

export default function Dashboard({ id }: props) {

    const [user, setUser] = useState<userType>({})
    const [tasks, setTasks] = useState<allTasks[]>([])

    const handleSubmit = async (task: task) => {
        try {
            console.log(task)
            const response = await axios.post(`/api/newtask/${id}`, { task })
            if (response.data.updatedTasks?.tasks) {
                setTasks(response.data.updatedTasks.tasks)
            }
            console.log(response)
        } catch (error) {
            console.log('Error While task posting : ', error)
        }
    }

    useEffect(() => {
        const fetchUser = async (_id: string) => {
            const response = await axios.post('/api/users', { userId: _id })
            return response.data;
        }

        const loadUser = async () => {
            try {
                const data = await fetchUser(id)
                setUser(data)
                if (data.tasks) {
                    setTasks(data.tasks)
                }
            } catch (error) {
                console.log('error in the dashboard component : ', error)
            }
        }

        loadUser();
    }, [id])

    return (
        <div className="min-h-screen bg-gray-100 px-20 pt-6">
            <p className='text-3xl mb-6 font-semibold text-gray-700'>Welcome {user.username}</p>
            <TaskInput submite={handleSubmit} />
            <div className='w-full flex flex-wrap gap-8'>
                {tasks.map((task) => (
                    <TaskCard key={task._id} task={task} />
                ))}
            </div>
        </div>
    )
}
