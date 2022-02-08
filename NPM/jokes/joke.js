var giveJoke = require("give-me-a-joke")
var colors = require("colors")
giveJoke.getRandomCNJoke((joke) => console.log(joke.rainbow));