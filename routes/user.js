import express from "express"
import {
    register,
    getAllUsers,
    getMyProfile,
    login,
    logout,
    homePage
} from "../controllers/user.js" 


const router = express.Router()

router.get('/',homePage)

router.get('/all', getAllUsers)

router.post('/register', register)

router.post('/login', login)

router.get('/logout', logout)


router.get('/me',getMyProfile)



// router.route("/me/:id")
//     .get(getMyProfile)
    // .put(updateUser)
    // .delete(deleteUser)


export default router;