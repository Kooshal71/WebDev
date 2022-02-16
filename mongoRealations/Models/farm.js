const mongoose = require('mongoose');
const { stringify } = require('uuid');
mongoose.connect('mongodb://localhost:27017/mongoRelation');
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:String,
    price:Number,
    season:{
        type:String,
        enum:["Summer", "Monsoon", "Spring", "Winter"]
    }
});

const Product = mongoose.model("Product", productSchema)

// Product.insertMany([
//     {name:"WaterMelon", price:2.5, season:"Summer"},
//     {name:"Apple", price:3.5, season:"Summer"},
//     {name:"Orange", price:4, season:"Winter"}
// ])

const farmSchema = new Schema({
    name:String,
    city:String,
    products:[
        {type: Schema.Types.ObjectId, ref:"Product"}
    ]
})

const Farm = mongoose.model("Farm", farmSchema)

// const makeFarm = async () => {
//     const farm = new Farm({ name:"Full Belly Farms", city:"Guinda, CA"})
//     const melon = await Product.findOne({name:"WaterMelon"})
//     farm.products.push(melon)
//     await farm.save()
//     console.log(farm)
// }

// makeFarm()

// const addProduct = async () => {
//     const farm = await Farm.findOne({name:"Full Belly Farms"})
//     const apple = await Product.findOne({name:"Apple"})
//     farm.products.push(apple)
//     await farm.save()
//     console.log(farm)
// }

// addProduct()

Farm.findOne({name:"Full Belly Farms"})
    .populate("products")
    .then(farm => console.log(farm))