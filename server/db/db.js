import mongoose from "mongoose"

export const dbConnect = async (req,res) => {
    try {
       await mongoose.connect(process.env.MONGODB_URL)

       console.log("Mongodb Connected")
    } catch (error) {
        console.log(error.message)
    }
}