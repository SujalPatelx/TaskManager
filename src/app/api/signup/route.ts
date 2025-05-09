import connectDb from "@/app/lib/db";
import User from "@/app/modules/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const { formdata } = await req.json();
        const { username, password } = formdata;

        console.log("username and password in server side", username, password);

        if (!username || !password) {
            return NextResponse.json({ msg: "Invalid Credentials", signup: false });
        }

        const existUser = await User.findOne({ username })

        if (existUser) {
            if (existUser.password === password) {
                return NextResponse.json({ msg: 'User already exist', signup: false })
            } else {
                return NextResponse.json({ msg: 'User name already exist', signup: false })
            }
        }

        const newUser = await User.create({ username, password });
        return NextResponse.json({ msg: "SignUp Successful", signup: true, id: newUser._id });

    } catch (err) {
        console.log("Error In Signup POST API:", err);
        return NextResponse.json({ msg: "SignUp Failed", signup: false });
    }
}