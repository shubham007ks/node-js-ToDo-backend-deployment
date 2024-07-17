import express from "express"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { config } from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"


export const app = express()


config({
    path: "./data/config.env"
})


// middleware 
app.use(express.json())
app.use(cookieParser())  // middleware to parse req body


// using routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tasks", taskRouter)
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))


// app.get("/", (req, res) => {
//     res.send("Hello")
// })
