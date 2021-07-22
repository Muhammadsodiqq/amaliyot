export default class Models {
    static async signUpModel(Sequelize,sequelize) {
        return sequelize.define("user", {
            user_id:{
                type: Sequelize.DataTypes.UUID,
                defaultValue:Sequelize.UUIDV4,
                primaryKey:true
            },
            user_userName:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique:true
            },
            user_name:{ 
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            user_lastName:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            user_email: { 
				type: Sequelize.DataTypes.STRING,
				is: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				allowNull: false,
				unique: true,
			},
            user_password: {
				type: Sequelize.DataTypes.STRING, 
				allowNull: false,
			},
            user_photo:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            }
        })
    }

    // static async qarzModel(Sequelize,sequelize) {
    //     return sequelize.define("qarz", {
    //         qarz_id: {
    //             type: Sequelize.DataTypes.UUID,
    //             defaultValue:Sequelize.UUIDV4,
    //             primaryKey:true
    //         }
    //     })
    // }

}