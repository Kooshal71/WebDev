const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const Product = require("./models/product")
const methodOverride = require("method-override")
const appError = require("./appError")
const Farm = require("./models/farm")
const ObjectID = require('mongoose').Types.ObjectId;

mongoose.connect("mongodb://localhost:27017/farmStand2", {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        console.log("Mongo Connection Open!")
    })
    .catch(err => {
        console.log("OH no mongo error")
        console.log(err)
    })

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))


app.get("/farms", async (req, res) => {
    const farms = await Farm.find({})
    res.render("farms/index", {farms})
})

app.post("/farms", async (req, res) => {
    const farm = new Farm(req.body)
    farm.save()
    res.redirect("/farms")
})

app.get("/farms/new", (req, res) => {
    res.render("farms/new")
})

app.get("/farms/:id", async (req, res) => {
    const farm = await Farm.findById(req.params.id).populate("products")
    // console.log(farm.name)
    // farm.products.populate
    // console.log(farm.products.name)
    // farm.populate()
    res.render("farms/details", {farm})
})

app.get("/farms/:id/products/new", async (req, res) => {
    const id = req.params.id
    const farm = await Farm.findById(id).populate("products")
    console.log(farm)
    res.render("products/new", {categories, farm})
})

app.post("/farms/:id/products", async (req, res) => {
    // res.send(req.body)
    const farm = await Farm.findById(req.params.id).populate("products")
    const {name, price, category} = req.body
    const product = new Product({name, price, category})
    farm.products.push(product)
    product.farm = farm
    await farm.save()
    await product.save()
    res.redirect(`/farms/${req.params.id}`)
})

app.delete("/farms/:id", async (req, res) => {
    const farm = await Farm.findOneAndDelete(req.params.id)
    console.log(farm)
    res.redirect("/farms")
})

categories = ["fruit", "vegetable", "dairy"]

function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).
        catch(e)
        {
            next(e)
        }
    }
}

app.get("/products", async (req, res, next) => {
    try{
    const category = req.query.category
    if(category)
    {
        const products = await Product.find({category})
        // console.log(products.find())
        res.render("products/index", {products, category})
    }
    else{
        const products = await Product.find({})
        res.render("products/index", {products,  category:"All"})
    }
    }
    catch(e)
    {
        next(e)
    }
    // console.log(products)
})

app.get("/products/new", (req, res) => {
    // throw new appError("Not allowed", 401)
    res.render("products/new", {categories})
})

app.get('/products/:id', async (req, res, next) => {
    const {id} = req.params;
    console.log(id)
    const foundProduct = await Product.findById(id).populate("farm")
    console.log(foundProduct)
    res.render("products/details", {foundProduct})
    // if (!ObjectID.isValid(id)) {
    //     return next(new appError('Invalid Id', 401));
    // }
    // if (!foundProduct) {
    //     return next(new appError('Product Not Found', 404));
    // }
})

app.get("/products/:id/edit", async (req, res, next) => {
    try{
    const product = await Product.findById(req.params.id)
    res.render("products/edit", {product})
    }
    catch(e)
    {
        next(e)
    }
})

app.put("/products/:id", async (req, res, next) => {
    try{
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {runValidators:true, new:true})
    // const foundProduct = await Product.findById(req.params.id)
    console.log(req.body)
    res.redirect(`/products/${req.params.id}`)
    }
    catch(e)
    {
        next(e)
    }
}) 

app.get("/products/:id", async (req, res, next) => {
    const id = req.params.id
    const foundProduct = await Product.findById(id)
    // console.log(foundProduct)
    if(!foundProduct === "CastError")
    {
        return next(new appError("Product not Found", 404))
    }
    res.render("products/details", {foundProduct})
})

app.post("/products", async (req, res, next) => {
    try{
    const newProduct = new Product(req.body)
    await newProduct.save()
    console.log(newProduct)
    res.redirect(`/products/${newProduct.id}`)
    }
    catch(e){
        next(e)
    }
})

app.delete("/products/:id", async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    console.log(product)
    res.redirect("/products")
})

// app.use((err, req, res, next) => {
//     const message = err.message
//     const status = err.status
//     res.status(status).send("This middleware is for errors")

// })

app.listen(3000, () => console.log("Server is running on 3000"))