import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

async function generateToken (data) {
    return jwt.sign(data,process.env.SECRET_WORD)
}

async function checktToken (token) {
    try {
        return jwt.verify(token,process.env.SECRET_WORD)
    } catch (error) {
        return false
    }
}

export default {
    generateToken,checktToken
}