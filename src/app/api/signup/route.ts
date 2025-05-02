import connectDb from "@/app/lib/db";
import User from "@/app/modules/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { username, password } = await req.body;
    try {
        await connectDb();
        if (username && password) {
            await User.create({ username, password }).then(() => {
                res.json({ msg: "SignUp Successfull", signUp: true, });
            })
        }
        else {
            res.json({ msg: "Invalid Credentials", signUp: false });
        }
    } catch (err) {
        console.log('Error While Creating User : ', err);
        res.json({ msg: 'SignUp Failed', login: false })
    }
}