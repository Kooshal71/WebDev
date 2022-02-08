const figlet = require("figlet")
const colors = require("colors")
figlet("Hello World !!", function(err, data){
    if(err) throw err;
    console.log(data.green)
})