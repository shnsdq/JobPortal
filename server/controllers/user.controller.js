import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import cloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { name, email, phoneNumber, password, role } = req.body

        if (!name || !email || !phoneNumber || !password || !role) {
            res.status(400).json({ message: "Feild is required", success: false })
        }

        const user = await User.findOne({ email })
        if (user) {
            res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hashPassword(password, 10);

        const file = req.file.image;
        const cloudImage = await cloudinary.uploader.upload(file.path)
        const image_url = cloudImage.secure_url;

        User.create({
            name,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePic: image_url
            }
        })

        return res.status(200).json({ success: true, message: "Account created successfully" })
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

        res.status(201).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: Strict }).json({ message: `Welcome back ${user.name}`, success: true, user })

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
        const user = await User.findById({ userId })
        if (!user) {
            res.status(400).json({ message: "Invalid user" })
        }

        const { name, email, phoneNumber, bio, skills } = req.body;

        if (!name || !email || !phoneNumber || !bio || !skills) {
            res.status(400).json({ message: "Feild is required", success: false })
        }

        let skillsArray;
        skillsArray = skills.split(',');

        if (skills) {
            user.skills = skillsArray;
        }

        const resume = req.file.resume;
        const cloudResponse = await cloudinary.uploader.upload(resume.path)
        const resumeUrl = cloudResponse.secure_url;

        if (cloudResponse) {
            user.profile.resume = resumeUrl
            user.profile.resumeOriginalName = resume.originalname;
        }

        const Image = req.file.image;
        const cloudImage = await cloudinary.uploader.upload(Image.path)
        const ImageUrl = cloudImage.secure_url;

        if (cloudImage) {
            user.profile.profilePhoto = ImageUrl
        }

        await user.save();

        const updatedUser = await User.findByIdAndUpdate(userId, {
            name,
            email,
            phoneNumber,
            bio,
            skills: skillsArray,
            profile
        },
            { new: true })

        return res.status(201).json({ success: true, message: "Updated Successfully", updatedUser })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const changePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body
        const { userId } = req.userId

        const user = await User.findById(userId)

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid password" })
        }

        const hashedPassword = await bcrypt.hashPassword(newPassword, 10);

        user.password = hashedPassword;
        await user.save({ validateBeforeSave: false });

        return res.status(201).json({ success: true, message: "Password Updated Successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}

