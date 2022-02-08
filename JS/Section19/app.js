/*
Syntax - 
    for(int i = 0; i<10; i++)

for(let i = 1; i<11; i++)
    console.log(`i = ${i}`);
//looping over arrays
const animals = ['lion', 'tiger', 'bear', 'koala', 'crow'];
for(let i = 0; i<animals.length; i++)
{
    console.log(animals[i]);
}
let str = "lol";
for(let i =  0; i<5; i++)
{
    console.log("Outer :"+i);
    for(let j = 0; j<3; j++)
    {
        console.log(str[j]);
    }
}
//Nested loops are most used with multidimensional arrays
/*
Syntax - 
    while(cond)
*/
/*
let m = 20;
while(m > 9)
{
    console.log(m);
    m--;
}
*/
// let max = parseInt(prompt("Enter Your Maximum Number"))
// while(!max)
// {
//     max = parseInt(prompt("Invalid Input please enter again"))
// }

// const target = Math.floor((Math.random() * max) + 1);

// let guess = (prompt("Enter your first guess"));
// let count = 0;

// while(parseInt(guess) !== target)
// {
//     count++;
//     if(guess === 'q' || parseInt(guess) === target) 
//     {
//         break;
//     }
//     else if(guess > target)
//     {
//         guess = parseInt(prompt("Guess is too high"));
//     }
//     else if(guess < target)
//     {
//         guess = parseInt(prompt("Guess is too low"));
//     }
// }
// if(guess === 'q') 
// {
//     alert("You Quit");
// }
// if(parseInt(guess) === target)
// {
//     alert("Good Guess")
//     alert(`It took you ${count} guesses.`)
// }
/*
for of loop
very new loop not supported in internet explorer
Syntax - 
    for(let i = 0; i<array.length; i++)
    {
        console.log(array[i]);
    }
    for(let i of array)
    {
        console.log(i);
    }
    both of these loops are the same
*/
const animals = ['lion', 'tiger', 'bear', 'koala', 'crow'];
for(x of animals)
console.log(x);
/*
for in loop
very new loop not supported in internet explorer
Syntax - 
    for(let i = 0; i<array.length; i++)
    {
        console.log(array[i]);
    }
    for(let i in object)
    {
        console.log(i); i will be the key of the object
    }
    This loop was created just for iterating through the object
*/
const testScores = {
    Kushal : 100,
    Shawn : 50,
    Michael: 103,
    Nadia: 200 

};

for(person in testScores)
console.log(`${person} scored : ${testScores[person]}`);

/*
Object.values(testScores) and Object.keys(testScores)
These 2 will return arrays with the respective information
*/