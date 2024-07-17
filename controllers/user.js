import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js"
import jwt from "jsonwebtoken"



export const homePage = (req, res) => {
    res.send("Hey there")
}


export const getAllUsers = async (req, res) => {
    const users = await User.find({})
    res.status(200).json({
        users
    })
}


export const register = async (req, res) => {

    const { name, email, password } = req.body

    const existUser = await User.findOne({ email })

    if (existUser) {
        return res.status(404).json({
            success: false,
            message: "User with this email already exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    sendCookie(newUser, res, "User created successfully", 201)
}


export const login = async (req, res) => {

    const { email, password } = req.body;

    // try {
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return res.status(404).json({ success: false, Message: "User with this email doesn't exist" });
    }

    // console.log(user);

    const chk = await bcrypt.compare(password, user.password)

    if (!chk) {
        return res.status(404).json({ success: false, Message: "Wrong password" });
    }

    // res.status(200).json({
    //     success: true,
    //     Message: `Welcome ${user.name}`,
    //     user
    // })

    sendCookie(user, res, `Hi , ${user.name}`, 200)
    // } catch (error) {

    // return res.status(500).json({ Message: "Server error", error });
    // }
}


export const logout = async (req, res) => {
    const { token } = req.cookies

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "First login"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded._id)

    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true
        })
        .json({
            success: true,
            message: `Logout successful, hope to see you soon ${user.name}`
        })
}




export const getMyProfile = async (req, res) => {

    // const { id } = req.params

    const { token } = req.cookies

    console.log(token);

    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Login first"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded._id)

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Provided id doesn't exist"
        })
    }

    res.status(200).json({
        success: true,
        user
    })
}


export const updateUser = async (req, res) => {

}


export const deleteUser = async (req, res) => {

}


// export const special = async (req, res) => {
//     res.json({
//         sucess:"true",
//         message:"celebrate"
//     })
// }