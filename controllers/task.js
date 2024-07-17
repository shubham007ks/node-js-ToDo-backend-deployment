import { Task } from "../models/task.js"
import { User } from "../models/user.js"
import jwt from "jsonwebtoken"


export const newTask = async (req, res) => {

    const { token } = req.cookies

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "First login"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded._id)




    const { title, description } = req.body

    const task = await Task.create({
        title,
        description,
        user
    })


    res.status(201).json({
        success: true,
        message: "Task added successfully",
        task
    })
}


export const allTask = async (req, res) => {

    const tasks = await Task.find({})

    console.log(tasks);

    res.status(200).json({ tasks })
}


export const myTask = async (req, res) => {

    const { token } = req.cookies

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "First login"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const userId = decoded._id

    const tasks = await Task.find({ user: userId })

    res.status(200).json({ tasks })
}


export const updateTask = async (req, res) => {

    const { token } = req.cookies

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "First login"
        })
    }

    const {id} = req.params

    const task = await Task.findById(id)

    task.isCompleted = !task.isCompleted

    await task.save()

    res.status(200).json({
        success:true,
        message:"Task Updated!"
    })
}


export const deleteTask = async (req, res) => {

    const { token } = req.cookies

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "First login"
        })
    }

    const {id} = req.params

    await Task.findByIdAndDelete(id)


    res.status(200).json({
        success: true,
        message: "Task deleted"
    })
}