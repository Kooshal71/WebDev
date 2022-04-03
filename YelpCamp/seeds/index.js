const mongoose = require("mongoose")
const cities = require("./cities")
const Campground = require("../models/campground")
const {places, descriptors} = require("./seedHelpers")
mongoose.connect("mongodb://localhost:27017/yelp-camp", {useNewUrlParser:true, useUnifiedTopology:true})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"))
db.once("open", () => {
    console.log("Database connected")
})

const sample = (array) => array[Math.floor(Math.random()*array.length)]

const seedDB = async() => {
    await Campground.deleteMany({})
    for(let i = 0; i<50; i++){
        const random1000 = Math.floor(Math.random()*1000)
        const camp = new Campground({
            author:"62481b16dff07da8a46ec75e",
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.YRxp_LLU7rvg6fxmZnHGSAHaEK%26pid%3DApi&f=1`,
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. ",
            price: Math.floor(Math.random() * 100) + 15 
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})