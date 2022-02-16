const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongoRelation');
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName:String,
    age:Number
})

const tweetSchema = new Schema({
    text:String,
    likes:Number,
    user: {
        type:Schema.Types.ObjectId, ref:"User"
    }
})

const User = mongoose.model("User", userSchema)
const tweet = mongoose.model("Tweet", tweetSchema)

// const makeTweets = async() => {
//     // const u = new User({userName:"Chicken", age:21})
//     const u = await User.findOne({username:"chicken"})
//     const tweet2 = new tweet({text:"I am a bird", like:32})
//     tweet2.user = u
//     // u.save()
//     tweet2.save()
// }

// makeTweets()

const findTweet = async () => {
    const t = await tweet.findOne({}).populate()
    console.log(t)
}

findTweet()