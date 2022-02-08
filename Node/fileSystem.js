const fs = require("fs")

fs.mkdir(process.argv[2], {recursive:true}, function(err){
    if(err) throw err;
    console.log("Directory is created")
})
let folderName = process.argv[2]
fs.writeFile(`${folderName}/index.html`,"", function(err){
    if(err) throw err;
    console.log("Index file created.")
})
fs.writeFile(`${folderName}/styles.css`,"", function(err){
    if(err) throw err;
    console.log("Styles file created.")
})
fs.writeFile(`${folderName}/app.js`,"", function(err){
    if(err) throw err;
    console.log("App file created.")
})
