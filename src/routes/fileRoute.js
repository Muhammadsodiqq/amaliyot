import express from "express"
import path from "path"
import fileUpload from "express-fileupload"
import fileController from "../controllers/fileController.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router()

const __dirname = path.resolve(path.dirname(""))


let option = {safeFileNames:true}

router.post("/create",[fileUpload("photo",option),authMiddleware],fileController.createPhoto)
router.use("/getfile", express.static(path.join(__dirname,"src","public","uploads")))
export default {
    path:"/file",
    router
}