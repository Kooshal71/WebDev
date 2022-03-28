const bcrpyt = require("bcrypt")

const hashPassword = async(pw) => {
    const salt = await bcrpyt.genSalt(10)
    const hashed = await bcrpyt.hash(pw, salt)
    console.log(salt)
    console.log(hashed)
}

const login = async(pw, hashedPw) => {
    const result = await bcrpyt.compare(pw, hashedPw)
    if(result){
        console.log("Successful login")
    }
    else{
        console.log("Wrong password")
    }
}

hashPassword("iwn")