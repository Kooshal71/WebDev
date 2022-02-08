const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/movieApp", {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        console.log("Connection Open!")
    })
    .catch(err => {
        console.log("OH no error")
        console.log(err)
    })
/*
    {
        title:"Amadeus",
        year:1980,
        rating:99,
        type:'A'
    }
*/
    const movieSchema = new mongoose.Schema({
        title: String,
        year: Number,
        rating: Number,
        type: String
    })

    const Movie = mongoose.model("Movie", movieSchema)  //Create collection called movies
    // const idiot = new Movie({title:"3 Idiots", year:2006, rating:95, type:"U"})
    // idiot.save()
