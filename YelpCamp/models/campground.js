const mongoose = require("mongoose")
const { campgroundSchema } = require("../schemas")
const Schema = mongoose.Schema
const review = require("./review")

const CampgroundSchema = new Schema({
    title:String,
    price:Number,
    image:String,
    description:String,
    location:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

CampgroundSchema.post("findOneAndDelete", async (x) => {
    if(x){
        await review.remove({
            id:{
                $in: x.reviews
            }
        })
    }
    console.log(x)
})

module.exports = mongoose.model("Campground", CampgroundSchema)