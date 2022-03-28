const bcrpyt = require("bcrypt")

const hashPassword = async(pw) => {
    const salt = await bcrpyt.genSalt(10)
    const hashed = await bcrpyt.hash(pw, salt)
    console.log(salt)
    console.log(hashed)
}

hashPassword("iwn")