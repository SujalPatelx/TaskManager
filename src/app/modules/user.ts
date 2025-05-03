import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: true
    },
    taskDes: {
        type: String,
        required: false,
        default: ""
    },
    taskDate: {
        type: Date,
        default: Date.now()
    },
    isComplete: {
        type: Boolean,
        default: false,
        required: true
    }
})


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    tasks: [taskSchema]
})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;