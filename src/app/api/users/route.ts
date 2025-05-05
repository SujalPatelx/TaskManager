import connectDb from "@/app/lib/db";
import User from "@/app/modules/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const { userId } = await req.json();
        const data = await User.findById(userId)
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ msg: "error While Fetchin Data" })
    }
}