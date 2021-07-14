import express from "express"
import userController from "../controllers/userController.js"
const router = express.Router()


router.post("/signup", userController.signUpPostController)
router.post("/login", userController.loginPostController)


export default {
    path:"/users",
    router
}