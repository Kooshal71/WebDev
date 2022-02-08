const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const Product = require("./models/product")
const methodOverride = require("method-override")
const appError = require("./appError")
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

categories = ["fruit", "vegetable", "dairy"]

app.get("/products/new", (req, res) => {
    // throw new appError("Not allowed", 401)
    res.render("products/new", {categories})
})

app.get('/products/:id', async (req, res, next) => {
    const {id} = req.params;
    if (!ObjectID.isValid(id)) {
        return next(new appError('Invalid Id', 400));
    }
    const product = await Product.findById(id)
    if (!product) {
        return next(new appError('Product Not Found', 404));
    }
    res.render('products/show', {product})
})

app.get("/products/:id/edit", async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.render("products/edit", {product})
})

app.put("/products/:id", async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {runValidators:true, new:true})
    // const foundProduct = await Product.findById(req.params.id)
    console.log(req.body)
    res.redirect(`/products/${req.params.id}`)
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

app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    console.log(newProduct)
    res.redirect(`/products/${newProduct.id}`)
})

app.delete("/products/:id", async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    console.log(product)
    res.redirect("/products")
})

app.use((err, req, res, next) => {
    const message = err.message
    const status = err.status
    res.status(status).send("This middleware is for errors")

})

app.listen(3000, () => console.log("Server is running on 3000"))