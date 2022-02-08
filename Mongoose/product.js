const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/shopApp", {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        console.log("Connection Established")
    })
    .catch(err => {
        console.log("Error is present")
        console.log(err)
    })

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true, // Makes sure that the input is compulsory
        maxlength: [20, "Too many characters"] //Makes sure that the input is less than the specified amount
    },
    price:{
        type:Number, //Makes sure that the input can be cast to be number
        min: [0, "Price must be positive, you df"]   //Makes sure that price is always greater than 0
    },
    sale:{
        type:Boolean,
        default:false // This will be the default value when nothing is specified
    },
    categories:[String],
    size:{
        type:String,
        enum:["XS", "S", "M", "L", "XL"]
    }
})

productSchema.methods.greet = function(){
    console.log("HELLO THERE")
    console.log(`-from ${this.name}`)
}

productSchema.methods.toggleSale = function(){
    this.sale = !this.sale
    this.price = this.price*0.2
    return this.save()
}

const Product = mongoose.model("Product", productSchema)

productSchema.statics.fireSale = function(){
    return this.updateMany({}, {sale:true, price:0})
}

/*
const findProduct = async () => {
    const foundProduct = await Product.findOne({name:"Bike Helmet"})
    await foundProduct.toggleSale()
    // fireSale()
    console.log(foundProduct)
}
*/

Product.fireSale().then(res => console.log(res))

// findProduct()
    // .then(data => {
    //     console.log("It worked")
    //     console.log(data)
    // })
    // .catch(err => {
    //     console.log(err)
    //     console.log("Error is present")
    // })

// const bike = new Product({name:"Pant", price:29.50, categories:["Formal", "Apparel"], size:"XL"})
// bike.save()

// Product.findOneAndUpdate({name:"Tire Pump"}, {price: 10.50}, {new:true, runValidators: true})