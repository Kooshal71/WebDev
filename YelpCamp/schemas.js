const Joi = require("joi")
const joi = require("joi")

module.exports.campgroundSchema = joi.object({
    title:joi.string().required(),
    price:joi.number().required().min(0),
    image:joi.string().required(),
    description:joi.string().required(),
    location:joi.string().required()
})

module.exports.reviewSchema = joi.object({
    rating:Joi.number().required(),
    body:joi.string().required().min(1).max(5)
})