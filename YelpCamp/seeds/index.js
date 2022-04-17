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
    for(let i = 0; i<200; i++){
        const random1000 = Math.floor(Math.random()*1000)
        const camp = new Campground({
            author:"62481b16dff07da8a46ec75e",
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. ",
            price: Math.floor(Math.random() * 100) + 15,
            geometry: {
                type:"Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }, 
            images : [ 
                { 
                    "url" : "https://res.cloudinary.com/dcnkr32rf/image/upload/v1649432472/YelpCamp/axso4ammfqcuarstglla.jpg", 
                    "fileName" : "YelpCamp/axso4ammfqcuarstglla" 
                }, 
                { 
                    "url" : "https://res.cloudinary.com/dcnkr32rf/image/upload/v1649432473/YelpCamp/vqtbfchxyrfvesv8opsg.jpg", 
                    "fileName" : "YelpCamp/vqtbfchxyrfvesv8opsg" 
                }, 
                { 
                    "url" : "https://res.cloudinary.com/dcnkr32rf/image/upload/v1649432474/YelpCamp/po8ljj3rpayfht2ilq5v.jpg", 
                    "fileName" : "YelpCamp/po8ljj3rpayfht2ilq5v" 
                }, 
                { 
                    "url" : "https://res.cloudinary.com/dcnkr32rf/image/upload/v1649432474/YelpCamp/ossbswwjsv5srwjpzi4e.jpg", 
                    "fileName" : "YelpCamp/ossbswwjsv5srwjpzi4e" 
                } 
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})
