var langs = require("langs")
var franc = require("franc")
var colors = require("colors")
langCode = franc(process.argv[2])
if(langCode !== "und")
{
    let ans = langs.where(3, langCode)
    console.log(`Our Best Guess is:${ans.name}`.green);
}
else
{
    console.log("Unable to find the language :(".red)
}