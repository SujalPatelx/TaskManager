import connectDb from "@/app/lib/db";
import User from "@/app/modules/user";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const { formData } = await req.json();
        const { username, password } = formData

        if (username && password) {
            await User.create({ username, password }).then((res) => {
                NextResponse.json({ msg: "SignUp Successfully", signup: true })
            })
        } else {
            NextResponse.json({ msg: 'Failed To SignUp', signup: false })
        }
        if (!username || !password) {
            NextResponse.json({ msg: 'Invaild Creadential', signup: false })
        }

    } catch (err) {
        console.log("Error In Login POST API : ", err)
    }
}