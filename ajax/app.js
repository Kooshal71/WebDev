// XHR demonstration
/*

const req = new XMLHttpRequest()
req.onload = function(){
    console.log("ALL DONE WITH REQUEST")
    const data = JSON.parse(this.responseText)
    console.log(data.ticker.price)
}
req.onerror = function(){
    console.log("ERROR")
    console.log(this)
}

req.open("GET", "https://api.cryptonator.com/api/full/btc-usd")
req.send()

*/
/*

fetch("https://api.cryptonator.com/api/full/btc-usd")
.then(res => {
    console.log("RESPONSE, WAITING TO PARSE", res)
    return res.json()
})
.then(data => {
    console.log(data.ticker.price)
})
.catch(err => {
    console.log("ERROR IS PRESENT", err)
})

*/

/*

const fetchBTC = async () => {
    const res = await fetch("https://api.cryptonator.com/api/full/btc-usd")
   let data =  await res.json()
   console.log(data.ticker.price)
}

*/
axios.get("https://api.cryptonator.com/api/full/btc-usd")
    .then(res => {
        console.log(res.data.ticker.price)
    })
    .catch(err => {
        console.log("ERROR !!",err)
    })

// const fetchBTC = async () => {
//     try
//     {
//         const res = await axios.get("https://api.cryptonator.com/api/full/btc-usd")
//         console.log(res.data.ticker.price)
//         const price = document.createElement("b");
//         price.append(res.data.ticker.price)
//         para.append(price)
//     }
//     catch(err)
//     {
//         console.log("ERROR!", err)
//     }
// }

const lists = document.querySelector("ul")
const jokeBtn = document.querySelector(".joke")
const BTCBtn = document.querySelector(".BTC")
const para = document.querySelector("p")

const getDadJoke = async () => {
    
    const config = {headers: {Accept: "application/json"}}
    const jokes = await axios.get("https://icanhazdadjoke.com/", config)
    console.log(jokes.data.joke)
    const newLi = document.createElement("li");
    newLi.append(jokes.data.joke);
    lists.append(newLi)
}

const fetchBTC = async () => {
    try
    {
        const res = await axios.get("https://api.cryptonator.com/api/full/btc-usd")
        console.log(res.data.ticker.price)
        const price = document.createElement("b");
        price.append(res.data.ticker.price)
        para.append(price)
    }
    catch(err)
    {
        console.log("ERROR!", err)
    }
}

const fetchMovies = async () => {
    try
    {
        const movie = await axios.get("https://api.tvmaze.com/search/shows?")

    }
    catch(err)
    {
        console.log("ERROR!", err)
    }
}

jokeBtn.addEventListener("click", () => getDadJoke())
BTCBtn.addEventListener("click", () => fetchBTC())

const form = document.querySelector("form")
form.addEventListener("submit", async function(e){
    e.preventDefault()
    const value = form.elements.query.value
    const config = {params: {q: value}}
    const res = await axios.get(`https://api.tvmaze.com/search/shows?`, config)
    displayImg(res.data)
})

const displayImg = function(shows){
    for(let result of shows)
    {
        if(result.show.image)
        {
            const img = (result.show.image.medium)
            console.log(img)
            const newImg = document.createElement("img")
            newImg.src = img
            document.body.append(newImg)
        }
    }
}