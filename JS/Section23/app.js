// 6 is the default parameter for the function in case nothing is given 6 will taken by default
function rollDie(numSide = 6)
{
    return(Math.floor(Math.random() * numSide)+1);
}
//Order are important and thats why they need to come after parameters that are not default
function greet(person, msg = "Hey There", punk = "!")
{
    console.log(`${msg}, ${person}${punk}`);
}
// Spread syntax allows an iterable to be expanded in places where 0 or arguments or elements are expected
const num = [9,2,4,6];
console.log(Math.max(13,14,5,7,9));
// ...array will spread the array into its respective elements where is requires a number of arguments
console.log(Math.max(...num));
console.log(...num);
// We can spread all iterables including strings
console.log(..."hello");
const dogs = ["Simba", "Brandy", "Ferry"]
const cat = ["Meow", "Blue"]
const catCopy = [...cat]
console.log(catCopy)

const feline = {legs:4, family: "Felidae"}
const canine = {legs:4, family: "Dog"}
//The order in which the objects are mentioned is important for the family property
const catDog = {...feline, ...canine};
 function raceResults(gold, silver, ...everyoneElse)
 {
     console.log(`Gold medal goes to : ${gold}`);
     console.log(`Silver medal goes to : ${silver}`);
     console.log(`Thanks to ${everyoneElse} for participating`);
 }
//  
const scores = [42135,2536,465,456,3256,2356,262345];
const highScore = scores[0];
// const[gold, silver, bronze] = scores;
// Destructing arrays
const raceRes = ["Kipchoge", "Felysia", "Ramesh"];
const [gold, ...everyoneElse] = raceRes;


const user = 
{
    email: "kushalhanesh2@hmail.com",
    pass: "UOVWB",
    firstName: "Kushal",
    lastName: "CG",
    born: "2002",
    died: "2020"
}
const {email} = user;
const {born: birthYear} = user;

function fullName(user)
{
    const {firstName, lastName} = user;
    return(`${firstName} ${lastName}`);
}

function fullName2({firstName, lastName})
{
    return(`${firstName} ${lastName}`);

}
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
// const good = movies.filter((movie) =>
// (
//     movie.score>=90
// ))
const good = movies.filter(({score}) => score>=90)