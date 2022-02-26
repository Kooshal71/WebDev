const mongoose  = require("mongoose")
const Schema = mongoose.Schema
const Product = require("./product")
const farmSchema = new Schema({
    name:{
        type:String,
        required:[true, "Farm must have a name"]
    },
    city:{
        type:String,
    },
    email:{
        type:String,
        required: [true, "Email is required"]
    },
    products:{
        type:[Schema.Types.ObjectId],
        ref:"Product"
    }
})

// farmSchema.pre("findOneAndDelete", async function(d){
//     console.log("PRE Middleware")
//     console.log(d)
//})

farmSchema.post("findOneAndDelete", async function(d){
    if(farmSchema.products){
        const res = Product.deleteMany({id:{$in:farmSchema.products}})
        console.log(res)
    }
})

const Farm = mongoose.model("Farm", farmSchema)
module.exports = Farm