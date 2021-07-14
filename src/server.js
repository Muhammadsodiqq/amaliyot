import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import path from 'path'
import http from 'http'
import routes from "./routes/routes.js"
import data from "./modules/postgres.js"

async function main () {
    const app = express()
    const server = http.createServer(app)
    let db = await data()
    //dirname
    const __dirname = path.resolve(path.dirname(""))
    
    //middlewares
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(async function (req,res, next)  {
        req.db = db
        next()
    })

    //routes
    routes(app)

   
    server.listen(80, _ => console.log("server ready"))
}

main()