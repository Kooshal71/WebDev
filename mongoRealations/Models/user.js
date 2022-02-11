const mongoose = require('mongoose');
const { stringify } = require('uuid');
mongoose.connect('mongodb://localhost:27017/mongoRelation');

const userSchema = new mongoose.Schema({
    first:String,
    last:String,
    address:[
        {
            street:String,
            city:String,
            state:String,
            country:String
        }
    ]
})

const User = mongoose.model("User", userSchema)

const makeUser = async () => {
    const u =  new User({
        first:"Harry",
        last:"Potter"
    })
    u.address.push({
        street:"123 Bang",
        city:"BNG",
        state:"KA",
        country:"IND"

    })
    const res = await u.save()
    console.log(res)
}

makeUser();

