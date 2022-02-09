const mongoose = require("mongoose")
const Product = require("./models/product")

mongoose.connect("mongodb://localhost:27017/farmStand2", {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        console.log("Mongo Connection Open!")
    })
    .catch(err => {
        console.log("OH no mongo error")
        console.log(err)
    })


// const p = new Product({
//     name:"Grapefruit",
//     price:1.35,
//     category:"fruit"
// })

// p.save().then(p => {
//     console.log(p)
// })


const seedProducts = [
    {
        name:"apple",
        price:2,
        category:"fruit"
    },
    {
        name:"cucumber",
        price:1.2,
        category:"vegetable"
    },
    {
        name:"tomato",
        price:3,
        category:"fruit"
    },
    {
        name:"radish",
        price:2.3,
        category:"vegetable"
    }
]
Product.deleteMany({}).then(() => console.log("Contents deleted"))
Product.insertMany(seedProducts).then(p => console.log(p))