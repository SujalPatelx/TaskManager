import connectDb from "@/app/lib/db";
import User from "@/app/modules/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        await connectDb();

        const { formdata } = await req.json();
        const { username, password } = formdata;

        if (username && password) {
            const user = await User.findOne({ username })
            if (user) {
                if (user.password === password) {
                    return NextResponse.json({ msg: 'login Successfully', login: true, id: user._id, status: 200 })
                } else {
                    return NextResponse.json({ msg: 'Invalid Password !!', login: false })
                }
            } else {
                return NextResponse.json({ msg: 'User Not Find !! ', login: false })
            }
        }

    } catch (error) {
        console.log('error in server side while login : ', error)
    }
}