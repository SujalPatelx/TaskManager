import mongoose from "mongoose";

const connectDb = () => {
    if (mongoose.connection.readyState === 1) {
        return
    } else {
        try {
            mongoose.connect('mongodb://localhost:27017/TaskManager').then(() => {
                console.log('MongoDb Connnected Successfully');
            }).catch((error) => {
                console.log("Error While Connecting To MongoDb", error);
            })
        } catch (err) {
            console.log('Error In Mongoose Connection : ', err)
        }
    }
}

export default connectDb;