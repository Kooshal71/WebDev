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

const opts = {toJSON: {virtuals: true}}

const CampgroundSchema = new Schema({
    title:String,
    price:Number,
    images:[imageSchema],
    geometry:{
        type:{
            type:String,
            enum:["Point"],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
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
},opts)

CampgroundSchema.virtual("properties.popUpMarkup").get(function(){
    return `<strong><a href="/campgrounds/${this.id}">${this.title}</a></strong>
    <p>${this.description.substring(0,40)}...</p>`
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