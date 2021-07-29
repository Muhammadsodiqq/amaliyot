import {Sequelize} from "sequelize"
import Models from "./models.js";
import dotenv from "dotenv"

dotenv.config()
let PgDialect = process.env.PgDialect
let PgStorage = process.env.PgStorage
const sequelize = new Sequelize({dialect:PgDialect,storage:PgStorage, logging:false},);


async function data () {
  try {
    let db = {}
    db.users = await Models.signUpModel(Sequelize,sequelize)
    db.files = await Models.photoModel(Sequelize,sequelize)

    await db.users.hasMany(db.files,{
      foreignKey:{
        name:"user_id",
        allowNull:true
      }
    })

    await db.files.belongsTo(db.users, {
      foreignKey: {
          name: "user_id",
          allowNull: false
      }
  })
    //  await sequelize.sync({force:true})



    return db
  } catch (error) {
    
    console.error('Unable to connect to the database:', error);
  }
}

export default data