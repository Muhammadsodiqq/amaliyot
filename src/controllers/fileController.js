import path from "path"
const __dirname = path.resolve(path.dirname(""))

export default class fileController {
    static async createPhoto(req,res) {
        let fileBase
        try {
            await req.db.files.destroy({where:{
                user_id:req.user.user_id
            }})

            const fileElement = req.files.file
            if(!fileElement) throw "file is not defined"
            if((fileElement.size /1024) > (50 * 1024) ) throw "file siz is oversize"
            const type = fileElement.name.split(".")[fileElement.name.split(".").length -1]
            

            const file = await req.db.files.create({
                type:type,
                user_id:req.user.user_id
            })
            fileBase = file


            let filePath = path.join(__dirname,"src", "public","uploads", `${file.dataValues.user_id}.` + type)
            fileElement.mv(filePath, (err) => {
                if(err) throw err
            })
            res.status(202).json({
                ok:true,
                message:"file uploaded",
                file:file
            })
        } catch (error) {
            console.log(error);
            if(fileBase){
                await req.db.files.destroy({
                    where:{
                        photo_id:fileBase.dataValues.photo_id
                    }
                })
            }
            res.status(400).json({
                ok:false,
                message:error+""
            })
        }
    }
}