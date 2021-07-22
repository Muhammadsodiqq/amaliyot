import bcrypt from "../modules/bcrypt.js";
import jwt from "../modules/jwt.js";
import validations from "../utils/validation.js";

export default class userController {
    static async signUpPostController(req,res) {
        try {
            let data = await validations.UserValidation().validateAsync(req.body)
            const user = await req.db.users.create({
                user_userName:data.username,
                user_name:data.name,
                user_lastName:data.surname,
                user_email:data.email,
                user_password:await bcrypt.generateCrypt(data.password)
            })
            console.log(user);

            res.status(200).json({
                ok:true,
                message:"succesfuly registrated",
                token:await jwt.generateToken({
                    id:user.dataValues.user_id
                })
            })
        } 
        catch (error) {
            if ((error == 'SequelizeUniqueConstraintError: Validation error')) {
                error = "username or email already exist";
            }
            res.status(400).json({
                ok:false,
                message:error + ""
            })
        }
    }

    static async loginPostController(req,res) {
        try {
            let data = await validations.loginValidation().validateAsync(req.body)
            const user = await req.db.users.findOne({
                where:{
                    user_email:data.email
                }
            })

            if (!user) throw "user not found"
            const isValid = await bcrypt.compareCrypt(data.password,user.dataValues.user_password)

            if(!isValid) throw "password is incorrect"

            res.status(200).json({
                ok:true,
                message:"Successfully logged",
                token:await jwt.generateToken({
                    id:user.dataValues.user_id
                })
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error + ""
            })
        }
    }

    static async getUser(req,res) {
        try {
            let user = await req.db.users.findOne({
                user_id:req.user.user_id
            })

            if(!user) throw"token is incorrect"
            res.status(200).json({
                ok:true,
                message:"user info",
                data:user.dataValues
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                ok:false,
                message:error + ""
            })
        }
    }

    static async getUsers(req,res) {
        try {
            let user = await req.db.users.findAll({
                user_userName:req.body.username
            })

            if(!user) throw"token is incorrect"
            res.status(200).json({
                ok:true,
                message:"user info",
                data:user.dataValues
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                ok:false,
                message:error + ""
            })
        }
    }
}