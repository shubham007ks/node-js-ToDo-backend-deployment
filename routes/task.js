import express from "express"
import { allTask, deleteTask, myTask, newTask, updateTask } from "../controllers/task.js"
import { homePage } from "../controllers/user.js"

const router = express.Router()

router.get('/',homePage)

router.post('/new', newTask)

router.get('/all', allTask)

router.get('/my', myTask)

router.route('/:id').put(updateTask).delete(deleteTask)


export default router