import Joi from "joi"

export default class validations {
    static UserValidation() {
        return Joi.object({
            name:Joi.string()
                .required()
                .min(3)
                .max(64)
                .error(Error("name is incorrect")),
            surname:Joi.string()
                .required()
                .min(3)
                .max(64)
                .error(Error("name is incorrect")),
            username:Joi.string()
                .required()
                .min(3)
                .max(64)
                .error(Error("username is incorrect")),
            email:Joi.string()
                .required()
			    .error(Error("email is invalid"))
			    .pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
            password:Joi.string()
                .min(3)
                .max(64)
                .required()
                .error(Error("password is invalid")),
        })
    }
    static loginValidation () {
        return Joi.object({
            email:Joi.string()
                .required()
                .error(Error("email is invalid"))
                .pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
            password:Joi.string()
                .min(3)
                .max(64)
                .required()
                .error(Error("password is invalid")),
        })
    }
}