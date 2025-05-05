import connectDb from "@/app/lib/db";
import User from "@/app/modules/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const { task } = await req.json();
        const id = req.url.split('/').pop();

        if (!id) {
            console.log("Id not found while adding task")
        } else {
            console.log('id found')
        }
        const pushTask = await User.updateOne(
            { _id: id },
            {
                $push: {
                    tasks: {
                        taskTitle: task.taskTitle,
                        taskDes: task.taskDes,
                        taskDate: new Date()
                    }
                }
            }
        );
        const updatedTask = await User.findById(id)
        return NextResponse.json({ msg: "task added", updatedTasks: updatedTask })
    } catch (err) {
        console.log("Somthing Went Wrong In Server Side : ", err)
        return NextResponse.json({ msg: 'Somthing Went Wrong In Server Side', err })
    }
}