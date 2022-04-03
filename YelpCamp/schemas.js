const Joi = require("joi")
const joi = require("joi")

campgroundSchema = joi.object({
    title:joi.string().required(),
    price:joi.number().required().min(0),
    image:joi.string().required(),
    description:joi.string().required(),
    location:joi.string().required()
})

reviewSchema = joi.object({
    rating:Joi.number().required().min(1).max(5),
    body:joi.string().required().min(1)
})

module.exports = {reviewSchema, campgroundSchema}
