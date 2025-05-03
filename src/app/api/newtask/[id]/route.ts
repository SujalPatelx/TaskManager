import connectDb from "@/app/lib/db";
import User from "@/app/modules/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const { title, description, id } = await req.json();
        if (title && description && id) {
            const user = await User.findById(id)
            if (!user) {
                return NextResponse.json({ msg: 'User Not Founded' })
            }
            user.tasks.push({
                taskTitle: title,
                taskDes: description
            })
            const updatedUser = User.find()
            return NextResponse.json({ msg: 'Task Added Successfully', updatedUser })
        }
    } catch (error) {
        return NextResponse.json({ msg: 'Somthing Went Wrong In Server Side' })
    }
}