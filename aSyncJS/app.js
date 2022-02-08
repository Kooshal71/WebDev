// console.log("Sending Request")
// setTimeout(() => {
//     console.log("Here is your data...")
// }, 300)
// console.log("This is the end")
// // WEB APIs are handled by the browser and is later updated
// // SetTimeout is done by the Web browser and not JS 
// // The only way this happens is because the browser keeps track of the time
// // JS is single threaded so its not possible to do more than one function at once
// // document.body.style.backgroundColor = "orange"
// /*

// setTimeout(() => {
//     document.body.style.backgroundColor = "red"    
// }, 1000)
// setTimeout(() => {
//     document.body.style.backgroundColor = "orange"    
// }, 2000)
// setTimeout(() => {
//     document.body.style.backgroundColor = "yellow"    
// }, 3000)
// setTimeout(() => {
//     document.body.style.backgroundColor = "red"
//     setTimeout(() => {
//         document.body.style.backgroundColor = "orange"
//         setTimeout(() => {
//             document.body.style.backgroundColor = "yellow"    
//         }, 1000)    
//     }, 1000)    
// }, 4000)


// */
// //To prevent this nesting we can create callback functions and that will work in a much more legible manner
// const delayedColor = (newColor, delay, doNext) =>
// {
//     setTimeout(() => {
//         document.body.style.backgroundColor = newColor
//     }, delay)
//     doNext();
// }

// // delayedColor("red", 2000, () =>{
// //     delayedColor("orange", 2000,, () =>{ 
// //         delayedColor("yellow", 2000, () => {
// //             console.log("This is the end.")
// //         })
// //     })
// // })
// const fakeRequest = (url, success, failure) =>
// {
//         const delay = Math.floor(Math.random()*4500)+500
//         setTimeout(() => {
//             if(delay>400){
//                 failure("Connection Timeout")
//             }
//             else{
//                 success(`Here is your fake data ${url}`)
//             }
//         }, delay)
// }


// //This is known as Callback Hell since it is very difficult to follow where the code goes
// // fakeRequest("books.com", 
// //     function(response){
// //         console.log("IT WORKED!")
// //         console.log(response)
// //         fakeRequest("books.com/page1",
// //             function(response){
// //                 console.log("IT WORKED AGAIN!!")
// //                 console.log(response)
// //                 fakeRequest("books.com/page2",
// //                 function(response){
// //                     console.log("IT WORKED 3")
// //                     console.log(response)
// //                 },
// //                 function(err){
// //                     console.log("ERROR 3")
// //                     console.log(err)
// //                 })
// //             },
// //             function(err){
// //                 console.log("ERROR 2")
// //                 console.log(err)
// //             })
// //     }, 
// //     function(err){
// //         console.log("ERROR!")
// //         console.log(err)
// //     }
// //     )

// // Promises is an object representing the eventual completion or failure of a request

// fakeRequestPromise('google.com/api')
//     .then(() => {
//     console.log("IT WORKED")
//     fakeRequestPromise('google.com/api/page1')
//         .then(() => {
//             console.log("IT WORKED AGAIN")
//         })
//         .catch(() => {
//             console.log("Connection Issue 2")
//         })
//     })
//     .catch(() => {
//         console.log("Connection Issue")
//     })
// //The Magic of Promises

// fakeRequestPromise("google.com/api")
//     .then( (data) => {
//         console.log("IT WORKED!")
//         // console.log(data)
//         return fakeRequestPromise
//     })
//     .then( (data) => {
//         console.log("IT WORKED 2")
//         // console.log(data)
//         return fakeRequestPromise
//     })
//     .then( (data) => {
//         console.log("IT WORKED 3")
//         // console.log(data)
//         return fakeRequestPromise
//     })
//     .catch( (err) => {
//         console.log("Connection Interrupted")
//         console.log(err)
//     })

// // Creating New Promises
// const fakeRequest1 = (url) => {
//     return new Promise((resolve, reject) => {
//         let rand = Math.random()
//         setTimeout(function(){
//             if(rand < 0.7){
//                 resolve(`your fake data ${url}`);
//             }
//             reject("CONNECTION ERROR")
//         }, 1000)
//     })
// }

// fakeRequest1("dogs/page1")
//     .then((data) => {
//         console.log("DONE WITH REQ")
//         console.log(`data is : ${data}`)
//     })
//     .catch((data) => {
//         console.log("ERROR")
//         console.log(data)
//     })
const delayedColorChange = (col, delay) => {
     return new Promise((resolve) => {
         setTimeout(function(){
             document.body.style.backgroundColor = col
             resolve(`${col} Completed`)
         }, delay)
     })
}

delayedColorChange("red", 1000)
     .then((data) => {
          console.log(data)
         return delayedColorChange("orange", 1000)
     })
     .then((data) => {
          console.log(data)
         return delayedColorChange("yellow", 1000)
     })
     .then((data) => {
          console.log(data)
         return delayedColorChange("green", 1000)
     })
     .then((data) => {
          console.log(data)
         return delayedColorChange("blue", 1000)
     })
     .then((data) => {
          console.log(data)
         return delayedColorChange("indigo", 1000)
     })
     .then((data) => {
          console.log(data)
         return delayedColorChange("violet", 1000)
     })
     .then((data) => {
         console.log(data)
     })
     /*
     .catch((err) => {
         console.log(err)
     })
     */
const sing = async () => 
{
    let rand = Math.random()
    if(rand>0.5)
    {
        throw "PROBLEMS"
    }
    return "PROMISES"
}

sing()
.then((data) =>
{
    console.log(data)
})
.catch((err) => {
    console.log(err)
})

const login = async(username, password) => {
    if(!username || !password)
    {
        throw "MISSING CREDENTIALS"
    }
    else if(password !== "MAGICAL")
    {
        throw "WRONG PASSWORD"
    }
    else
    {
        // console.log("Please wait for 5 seconds...")
        // setTimeout(() => `ACCESS GRANTED to ${username}`, 5000)
        return `ACCESS GRANTED to ${username}`
    }
}

login("KUSHAL", "MAGICAL")
.then((data) => 
{
    console.log(data)
})
.catch((err) => {
    console.log(err)
})
// Await keyword is used to make sure that the next function doesn't happen until the promise is resolved 
async function rainbow(completion)
{
    if(completion === 1)
    {
        await delayedColorChange('red', 1000)
        await delayedColorChange('orange', 1000)
        await delayedColorChange('yellow', 1000)
        await delayedColorChange('blue', 1000)
        await delayedColorChange('green', 1000)
        await delayedColorChange('indigo', 1000)
        await delayedColorChange('violet', 1000)
        return "ALL DONE"
    }
    throw "NOT REQUIRED"
}

rainbow(1)
.then((data) => {
    console.log(data)
})
.catch((err) => {
    console.log(err)
})

const fakeRequestPromise = (url) =>
{
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random()*4500)+500
        setTimeout(function(){
            if(delay>4000){
                reject("Connection Timeout")
            }
            else{
                resolve(`Here is your fake data ${url}`)
            }
        }, delay)
    })
}

async function makeTwoRequests()
{
    try{
        let data1 = await fakeRequestPromise("google.com")
        console.log(data1)
        let data2 = await fakeRequestPromise("google.com/page1")
        console.log(data2)
    }
    catch(e)
    {
        console.log("ERROR IS PRESENT")
        console.log(e)
    }
}