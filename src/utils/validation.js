import Joi from "joi"

export default class validations {
    static UserValidation() {
        return Joi.object({
            name:Joi.string()
                .required()
                .min(3)
                .error(Error("name Must be more than 3 letters"))
                .max(32)
                .error(Error("name Must be less than 32 letters"))
                .error(Error("name is incorrect")),
            surname:Joi.string()
                .required()
                .min(3)
                .error(Error("surname Must be more than 3 letters"))
                .max(32)
                .error(Error("surname Must be less than 32 letters"))
                .error(Error("name is incorrect")),
            username:Joi.string()
                .required()
                .min(3)
                .error(Error("username Must be more than 3 letters"))
                .max(25)
                .error(Error("username Must be less than 25 letters"))
                .error(Error("username is incorrect")),
            email:Joi.string()
                .required()
			    .error(Error("email is invalid"))
			    .pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
            password:Joi.string()
                .min(3)
                .error(Error("password Must be more than 3 letters"))
                .max(64)
                .error(Error("password Must be less than 64 letters"))
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
                .error(Error("password Must be more than 3 letters"))
                .max(64)
                .error(Error("password Must be less than 64 letters"))
                .required()
                .error(Error("password is invalid")),
        })
    }
    static nameValidation () {
        return Joi.object({
            name:Joi.string()
                .min(3)
                .max(32)
                .required()
                .error(Error("email is invalid")),
            lastname:Joi.string()
                .min(3)
                .max(32)
                .required()
                .error(Error("password is invalid")),
        })
    }
    static surnameValidation () {
        return Joi.object({
            username:Joi.string()
                .min(3)
                .max(25)
                .lowercase()
                .required()
                .error(Error("username is invalid")),
        })
    }


}