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
            console.log(user);
            if (!user) throw "user not found"
            const isValid = await bcrypt.compareCrypt(data.password,user.dataValues.user_password)

            if(!isValid) throw "password is incorrect"

            res.status(200).json({
                ok:true,
                message:"Successfully logged",
                token:await jwt.generateToken({
                    id:user.dataValues.user_id
                }),
                data:user.dataValues,
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

            res.status(200).json({
                ok:true,
                message:"user info",
                data:req.user,
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
            let users = await req.db.users.findAll({
                include:{
                    model:req.db.files
                },
            })

            res.status(200).json({
                ok:true,
                message:"users info",
                data:users
            })
        } catch (error) {
            
            res.status(400).json({
                ok:false,
                message:error + ""
            })
        }
    }

    static async editAccount(req,res) {
        try {
            let data = await validations.loginValidation().validateAsync(req.body)
            await req.db.users.update({
                user_email:data.email,
                user_password:await bcrypt.generateCrypt(data.password)
            },{
                where:{
                    user_id:req.user.user_id
                }
            })
            res.status(200).json({
                ok:true,
                message:"succesfuly updated",
            })
        } catch (error) {
            if ((error == 'SequelizeUniqueConstraintError: Validation error')) {
                error = "email already exist";
            }
            res.status(400).json({
                ok:false,
                message:error + ""
            })
        }
    }

    static async editName(req,res) {
        try {
            let data = await validations.nameValidation().validateAsync(req.body)

             await req.db.users.update({
                user_name:data.name,
                user_lastName:data.lastname
            },{
                where:{
                    user_id:req.user.user_id
                }
            })

            let user = await req.db.users.findOne({
                where:{
                    user_id:req.user.user_id
                },
                attributes:['user_name','user_lastName']
            })



            res.status(200).json({
                ok:true,
                message:"succesfuly updated",
                data:user
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error + ""
            })
        }
    }

    static async editUsername(req,res) {
        try {
            let data = await validations.surnameValidation().validateAsync(req.body)

             await req.db.users.update({
                user_userName:data.username,
            },{
                where:{
                    user_id:req.user.user_id
                }
            })

            let user = await req.db.users.findOne({
                where:{
                    user_id:req.user.user_id
                },
                attributes:['user_userName']
            })
            res.status(200).json({
                ok:true,
                message:"succesfuly updated",
                data:user
            })
        } catch (error) {
            if ((error == 'SequelizeUniqueConstraintError: Validation error')) {
                error = "  username already exist";
            }            res.status(400).json({
                ok:false,
                message:error + "",
                
            })
        }
    }

}