import connectDb from "@/app/lib/db";
import User from "@/app/modules/user";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const { updateTask } = await req.json()
        const { title, description, taskId } = updateTask;

        const user = await User.updateOne(
            { "tasks._id": taskId },
            {
                $set: {
                    "tasks.$.taskTitle": title,
                    "tasks.$.taskDes": description,
                    "tasks.$.taskDate": new Date()
                }
            }
        );

        if (user.modifiedCount > 0) {
            return NextResponse.json({ msg: 'Task Updated Successfully', updated: true })
        }
        return NextResponse.json({ msg: 'Failed To Update Task', updated: false })
    } catch (error) {
        console.log("error in update route : ", error)
    }
}