if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

console.log(process.env.SECRET)
console.log(process.env.API_KEY)

const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const expressError = require("./utils/expressError")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
const localStrategy = require("passport-local")
const mongoSanitize = require("express-mongo-sanitize")
const helmet = require("helmet")

const userRoutes = require("./routes/users")
const campgroundRoutes = require("./routes/campground")
const reviewRoutes = require("./routes/reviews")
const User = require("./models/user")

mongoose.connect("mongodb://localhost:27017/yelp-camp", {useNewUrlParser:true, useUnifiedTopology:true})
const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error"))
db.once("open", () => {
    console.log("Database connected")
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)
app.use(express.static(path.join(__dirname, "public")))
app.use(mongoSanitize())
const sessionConfig = {
    name:"GGS",
    secret:"Kewl",
    resave:false,
    saveUnitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge:1000 * 60 * 60 * 24 * 7
    }
}
/*
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net/",
    "https://res.cloudinary.com/dcnkr32rf/",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/",
    "https://res.cloudinary.com/dcnkr32rf/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://*.tiles.mapbox.com/",
    "https://events.mapbox.com/",
    "https://res.cloudinary.com/dcnkr32rf/",
];
const fontSrcUrls = ["https://res.cloudinary.com/dcnkr32rf/"];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dcnkr32rf/*", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],	
            mediaSrc   : [ "https://res.cloudinary.com/dcnkr32rf/" ],	
            childSrc   : [ "blob:" ]
        },
    })
);
*/

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net/",
    "https://res.cloudinary.com/dcnkr32rf/"
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/",
    "https://res.cloudinary.com/dcnkr32rf/"
];
const connectSrcUrls = [
    "https://*.tiles.mapbox.com",
    "https://api.mapbox.com",
    "https://events.mapbox.com",
    "https://res.cloudinary.com/dcnkr32rf/"
];
const fontSrcUrls = [ "https://res.cloudinary.com/dcnkr32rf/" ];

app.use(
    helmet({contentSecurityPolicy:{
        directives : {
            defaultSrc : [],
            connectSrc : [ "'self'", ...connectSrcUrls ],
            scriptSrc  : [ "'unsafe-inline'", "'self'", ...scriptSrcUrls ],
            styleSrc   : [ "'self'", "'unsafe-inline'", ...styleSrcUrls ],
            workerSrc  : [ "'self'", "blob:" ],
            objectSrc  : [],
            imgSrc     : [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dcnkr32rf/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
                "https://images.unsplash.com/"
            ],
            fontSrc    : [ "'self'", ...fontSrcUrls ],
            mediaSrc   : [ "https://res.cloudinary.com/dcnkr32rf/" ],
            childSrc   : [ "blob:" ]
        }
    },
        crossOriginEmbedderPolicy: false
    })
);

app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



app.use((req, res, next) => {
    // console.log(req.query)
    res.locals.currentUser = req.user
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    next()
})


app.get("/fakeUser", async(req, res) => {
    const user = new User({email:"kushalganesh2@gmail.com", username:"Kushal"})
    const newUser = await User.register(user, "monke")
    res.send(newUser)
})

app.use("/", userRoutes)
app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/reviews", reviewRoutes)

app.get("/", (req, res) => {
    res.render("home")
})


app.all("*", (req, res, next) => {
    next(new expressError("Page not found", 404))
})

app.use((err, req, res, next) => {
    const {status = 500, message = "Something went wrong"} = err
    res.status(status).render("errors", {err})
    // res.send("Something went wrong")
})

app.listen(3000, () => console.log("Server is running on port 3000"))
