const bcrypt = require("bcrypt")
const mongoose =  require("mongoose")
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Username is required"]
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    }
})

userSchema.statics.findAndValidate = async function(username, password){
    const user = await this.findOne({username})
    const isValid = await bcrypt.compare(password, user.password)
    return isValid?user:false
}

userSchema.pre("save",async function(next){
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

module.exports = mongoose.model("user", userSchema)