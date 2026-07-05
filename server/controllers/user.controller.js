import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import cloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body

        if (!fullname || !email || !phoneNumber || !password || !role) {
            res.status(400).json({ message: "Feild is required", success: false })
        }

        const exists = await User.findOne({ email })
        if (exists) {
            res.status(400).json({ message: "User already exists",
                success:false
             })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const file = req.file;
        let fileUri = null;

        if(file){
            fileUri = getDataUri(file);
        }

        let cloudResponse = null;
        if(fileUri){
            cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        }

       const newUser = new User({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePic: cloudResponse?.secure_url
            }
        })

        const user = await newUser.save();

        const tokenData = { userId: user._id }

        const token = jwt.sign(tokenData, process.env.TOKEN_KEY, { expiresIn: "1d" })

        return res.status(201).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({ success: true,user, message: "Account created successfully" })

    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            res.status(400).json({ message: "Field is required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ message: "Invalid email or password" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid password" })
        }

        const tokenData = { userId: user._id }

        const token = jwt.sign(tokenData, process.env.TOKEN_KEY, { expiresIn: "1d" })

        res.status(201).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({ message: `Welcome back ${user.fullname}`, success: true, user })

    } catch (error) {
        console.log(error)
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "").json({ message: "Successfully logged out", success: true })
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId)
        if (!user) {
            res.status(400).json({ message: "Invalid user" })
        }

        const { fullname, email, phoneNumber, bio, skills } = req.body;

        if (!fullname || !email || !phoneNumber || !bio || !skills) {
            res.status(400).json({ message: "Field is required", success: false })
        }

         const file = req.file;
        let fileUri = null;

        if(file){
            fileUri = getDataUri(file);
        }

        let cloudResponse = null;
        if(fileUri){
            cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        }

        
        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
       
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber

         if (!user.profile) user.profile = {};
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

    
        // resume comes later here...
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }

        await user.save();

       const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(201).json({ success: true, message: "Updated Successfully", updatedUser })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}