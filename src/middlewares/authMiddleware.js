import jwt from "../modules/jwt.js";

export default  async function authMiddleware(req,res,next){
    try {
        if (!req.headers.authorization) throw "Token not found";

        let token = req.headers.authorization

        token = await jwt.checktToken(token)
        // console.log(token.id);
        const user = await req.db.users.findOne({
            where:{
                user_id:token.id
            }
        })

        if(!user) throw "user not found"


        req.user = user.dataValues
        next()
    } catch (error) {
        res.status(403).json({
            ok:false,
            message:error + ""
        })
    }
}