const mongoose = require("mongoose")
const { campgroundSchema } = require("../schemas")
const Schema = mongoose.Schema
const review = require("./review")

//https://res.cloudinary.com/dcnkr32rf/image/upload/v1649437159/YelpCamp/smt4w8gwg33tzoyrtfen.jpg

const imageSchema = new Schema({
    url:String,
    fileName:String
})

imageSchema.virtual("thumbnail").get(function(){
    return this.url.replace("/upload", "/upload/w_200")
})

const CampgroundSchema = new Schema({
    title:String,
    price:Number,
    images:[imageSchema],
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