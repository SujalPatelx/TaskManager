import React from 'react'

type taskType = {
    taskTitle: string,
    taskDes: string,
    taskDate: string,
    isComplete: boolean,
    _id?: string
}

export default function TaskCard({ task, click }: { task: taskType, click: (taskTitle: string, taskDes: string, taskId: string) => void }) {

    function timeAgo(dateString: string): string {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (seconds < 60) return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
        if (minutes < 60) return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
        if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
        if (days < 30) return days === 1 ? '1 day ago' : `${days} days ago`;
        if (months < 12) return months === 1 ? '1 month ago' : `${months} months ago`;
        return years === 1 ? '1 year ago' : `${years} years ago`;
    }

    const handleEdit = () => {
        if (task._id) {
            click(task.taskTitle, task.taskDes, task._id)
        }
    }

    return (
        <div className='mt-20 w-full     max-w-sm'>
            <div className='px-6 py-6 bg-gray-300 rounded-2xl'>
                <p className='text-2xl text-zinc-800'>{task.taskTitle}</p>
                <p className='text-lg text-zinc-500'>{task.taskDes}</p>
                <div className='flex gap-2'>
                    <button className='mt-4 px-3 py-2 bg-blue-500 rounded-lg text-gray-100 cursor-pointer'>Done</button>
                    <button className='mt-4 px-3 py-2 bg-blue-500 rounded-lg text-gray-100 cursor-pointer' onClick={handleEdit}>Edit</button>
                </div>
                <p className='mt-4'>{timeAgo(task.taskDate)}</p>
            </div>
        </div>
    )
}
