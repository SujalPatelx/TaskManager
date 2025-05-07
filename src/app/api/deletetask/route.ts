import connectDb from "@/app/lib/db";
import User from "@/app/modules/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { taskId, id } = await req.json();
        console.log("Deleting Task Details: ", taskId, id);

        if (taskId) {
            await User.findByIdAndUpdate(id,
                {
                    $pull: {
                        tasks: {
                            _id: taskId
                        }
                    }
                },
                { new: true }
            )
            const updatedTasks = await User.findById(id)
            return NextResponse.json({ msg: 'Task Deleted Successfully', delete: true, updatedTasks })
        } else {
            return NextResponse.json({ msg: 'Task Not Founded', delete: false })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: 'Task Not Founded', delete: false })
    }
}