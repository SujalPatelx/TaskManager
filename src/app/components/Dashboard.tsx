'use client'
import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
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

type updateTask = {
    title: string,
    description: string
    taskId: string
}

export default function Dashboard({ id }: props) {

    const [user, setUser] = useState<userType>({})
    const [tasks, setTasks] = useState<allTasks[]>([])
    const [show, setShow] = useState(false);
    const [updated, setUpdated] = useState(false)
    const [updateTask, setUpdateTask] = useState<updateTask>({
        title: '',
        description: '',
        taskId: ''
    })

    const notifySuccess = (msg: string) => toast.success(msg);
    const notifyError = (msg: string) => toast.error(msg);

    const onClick = (taskTitle: string, taskDes: string, taskId: string) => {
        setShow(!show);
        setUpdateTask((prev) => ({
            ...prev,
            title: taskTitle,
            description: taskDes,
            taskId
        }))
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTask((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (task: task) => {
        try {
            const response = await axios.post(`/api/newtask/${id}`, { task })
            if (response.data.updatedTasks?.tasks) {
                setTasks(response.data.updatedTasks.tasks)
                notifySuccess('New Task Added')
            }
            console.log(response)
        } catch (error) {
            console.log('Error While task posting : ', error)
        }
    }

    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post(`/api/updatetask`, { updateTask })
            if (response.data.updated) {
                notifySuccess(response.data.msg)
                setShow(false)
                const userResponse = await axios.post('/api/users', { userId: id })
                if (userResponse.data.tasks) {
                    setTasks(userResponse.data.tasks)
                }
            } else {
                notifyError("Failed to update task")
            }
        } catch (error) {
            notifyError("Error While updating")
        }
    }
    const handleDelete = async (taskId: string) => {
        try {
            const response = await axios.post('/api/deletetask', { taskId, id })
            if (response.data.delete) {
                notifySuccess(response.data.msg);
                setTasks(response.data.updatedTasks?.tasks)
            } else {
                notifyError(response.data.msg)
            }
        } catch (error) {
            console.log("Error while delete endpoint : ", error)
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
        setShow(false)
        loadUser();
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 px-20 pt-6">
            <ToastContainer />
            <p className='text-5xl mb-8 font-semibold text-gray-700'>Welcome {user.username}</p>
            <TaskInput submite={handleSubmit} />
            <div className='w-full flex flex-wrap gap-8'>
                {tasks.map((task) => (
                    <TaskCard key={task._id} task={task} editTask={onClick} deleteTask={handleDelete} />
                ))}
            </div>
            {show && (
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)' }} className="fixed inset-0 bg-zinc-700 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96 transform transition-all duration-300">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">Task Details</h3>
                            <button
                                onClick={() => setShow(false)}
                                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <form className='w-full flex flex-col gap-6 items-center justify-center'>
                                <div className='w-full'>
                                    <label htmlFor="tasktitle" className='text-xl font-normal'>Task Title :</label>
                                    <input type="text" value={updateTask.title} onChange={handleChange} name='title' id='title' placeholder='Task Title' className='p-2 bg-gray-300 rounded-lg w-full mt-1' />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="taskdes" className='text-xl font-normal'>Task Description :</label>
                                    <input type="text" value={updateTask.description} onChange={handleChange} name='description' id='description' placeholder='Task Description' className='p-2 bg-gray-300 rounded-lg w-full mt-1' />
                                </div>
                                <button
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                                    onClick={handleUpdate}>
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
