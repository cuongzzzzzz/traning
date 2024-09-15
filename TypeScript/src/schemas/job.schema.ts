import Joi from "joi"

const jobSchema = Joi.object({
    title: Joi.string()
        .required()
        .messages({
            "string.empty": "title is required",
            "any.required": "title is required",
        }),

    content: Joi.string()
        .required()
        .messages({
            "string.empty": "content is required",
            "any.required": "content is required",
        })
})

export default jobSchema




