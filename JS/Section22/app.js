/*
array.forEach(func)
This will execute the function for each of the elements in the array
*/
// const num = [9,8,7,6,5,4,3,2,1];
// num.reverse();
// num.forEach(function(el){
//     if(el%2)
//     console.log(el);
// })
const movies = 
[
    {
        title: "Alien",
        score: 90
    },
    {
        title: "Superman",
        score: 95
    },
    {
        title: "Parasite",
        score: 100
    },
    {
        title: "Toy Story",
        score: 99
    },
    {
        title: "Titanic",
        score: 50
    }
]
 movies.forEach(function(movie){
     console.log(`${movie.title} - ${movie.score}`)
 })
 /*
 array2 = array.map(func)
 Map returns a new array with the function being applied on every element of the array
 */
// const sq = num.map(function(n)
// {
//     return n*n;
// })
// sq.forEach(function(ele)
// {
//     console.log(ele);
// })
/*
Arrow Functions
Shorthand function notation
variable = (parameters) =>
{
    function body
}
*/
const add = (x,y) =>
{
    return x+y;
}

const square = (x) =>
{
    return x*x;
}

const greet = (name) =>
{
    console.log(`Hey ${name}`);
};
//Implicit returns allow us to skip the return keyword
//We can also put the entire expression on the same line
//They only work if theres only expression in the entire function
const rollDie = (x) => Math.floor(Math.random()*x)+1;
// const rating = movies.map(function(movie)
// {
//     return(`${movie.title} - ${movie.score/10}`);
// })
// for(movie of rating)
//     console.log(movie);
const rating = movies.map(movie =>
(
    `${movie.title} - ${movie.score/10}`
))
/*
setTimeout
setTimeout(func(),time(ms))
It will execute the function after time ms
setInterval
setInterval(func(), time(ms))
It will execute the function repeatedly at every interval of time(ms)
clearInterval is used to stop it.
*/
// console.log("HELLO");
// setTimeout(()=>
// {
//     console.log("Are You Still There?");
// },3000)

// const id = setInterval(() => {
//      console.log(Math.random())
// }, 2000);
const num = [9,8,7,6,5,4,3,2,1];
const odd = num.filter(n =>
    {
        return n%2 === 1;
    })
const good = movies.filter(n => n.score>80);
/*
Filter does not change the original array but will return a modified one
the function must return a true boolean value if it is to be added to the new array
*/
/*
Some and Every
Some - returns true if at least one of the element passes the condition
Every - returns true if all of the elements passes the condition
*/
const exams = [90,20,35,60,75,80,90,96,97,95,100];
const pass = exams.filter(n => n>60).length
const bad = movies.filter(n => n.score<60)
movies.some(n => n.score<30)
/*
Reduce
Reduces all the elements in an array that produces a single element
We need to produce a reducer function
*/
let sum = num.reduce((sum,val) => sum+val);
let max = num.reduce((max,val) =>
{
    if(max>val)
        return max;
    else
        return val;
})
const high = movies.reduce((max, val) =>
{
    if(val.score<max.score)
    {
        return max;
    }
    return val;
})
const evens = [2,4,6,8];

const person = {
    firstName: 'Viggo',
    lastName: 'Chandira',
    fullName: function()
    {
        console.log(`${this.fullName}`);
    }
}