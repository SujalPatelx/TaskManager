'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function SignUp() {
    const router = useRouter();

    type FormData = {
        username: string,
        password: string
    }

    const [formdata, setFormdata] = useState<FormData>({
        username: "",
        password: ""
    })

    const notifyError = (msg: string) => toast.error(msg);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/signup', { formdata });
            if (response.data.signup) {
                console.log('user created successfully', response.data.id);
                router.push(`/dashboard/${response.data.id}`);
            } else {
                notifyError(response.data.msg)
            }
        } catch (error) {
            console.error('Error in user post method:', error);
            alert('Failed to create user. Please try again.');
        }
    }

    const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormdata((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className='bg-zinc-800 w-full h-screen flex flex-col items-center justify-center'>
            <ToastContainer />
            <h1 className='text-6xl text-blue-500 mb-8 font-semibold'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='w-full max-w-md bg-zinc-600 px-6 py-10 rounded-xl flex flex-col gap-4'>
                <div className='text-zinc-200 flex flex-col'>
                    <label htmlFor="username" className='mb-2 text-xl'>User Name</label>
                    <input type="text" name='username' id='username' value={formdata.username} onChange={handelChange} placeholder='Your UserName' className='p-3 border-0 bg-zinc-400 focus:outline-zinc-500 rounded-xl text-zinc-100' />
                </div>
                <div className='text-zinc-200 flex flex-col'>
                    <label htmlFor="password" className='mb-2 text-xl'>Password</label>
                    <input type="text" name='password' id='password' value={formdata.password} onChange={handelChange} placeholder='Your password' className='p-3 bg-zinc-400 forced-colors:border-zinc-500 rounded-xl text-zinc-100' />
                </div>
                <div className='text-zinc-300 flex flex-col mt-6'>
                    <button className='p-4 bg-blue-500 rounded-xl cursor-pointer'>Create User</button>
                </div>
                <div className='w-full mt-6 font-medium'>
                    <p className='text-zinc-200 text-center'>Already have account? <Link className='text-blue-500' href='/login'>login</Link></p>
                </div>
            </form>
        </div>
    )
}
