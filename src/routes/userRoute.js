import express from "express"
import userController from "../controllers/userController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
const router = express.Router()


router.post("/signup", userController.signUpPostController)
router.post("/login", userController.loginPostController)
router.get("/",authMiddleware, userController.getUser)
router.get("/",authMiddleware, userController.getUsers)


export default {
    path:"/users",
    router
}