/*
Scope 
The location where a variable is defined will dictate where it can be 
used in the code.
Function Scope
    The variables created inside the function can be accessed only inside the function
    The variables outside the function however can be accessed within the function
Block Scope
    The variables present inside a block also follow the same scope rules
    A block can be easily defined as the code present within the curly braces(other than functions)
    we can however use var to overwrite this, however this is not possible for function scope
Lexical Scope
    functions are executed using the scope chain that was in effect when they were defined
    So  variables that are declared closer to the inner scope will be printed even if there is a global
    variable with the same name, this can be considered as the gist of lexical scoping
*/
function collectEggs()
{
    let totalEggs = 10;//totalEggs is only present inside the function and it cannot be accessed outside the function
}
//console.log(totalEggs);   This will result in an error since totalEggs only has a scope within the function collectEggs
let bird = 'Scarlet Macaw'
function birdWatch()
{
    let bird = 'Great Blue Heron';
    console.log(bird);
}
console.log(bird);
let radius = 9
if(radius>0)
{
    const PI = 3.14;
    let circ = 2*PI*radius;
}
//Both PI and circ are outside the scope of the code and they cannot be accessed from outside the block
const add = function(x,y)
{
    return x+y;
}
//This function does not have a name and the returned value is stored in the variable and the function must also be called with the same variable
/*
Higher Order Function
These functions will expect another function as the argument and will be executed
They can also return a function as value of the function
*/
function callTwice(func)
{
    console.log(func(5,6));
    console.log(func(4,9));
}
function makeMysteryFunc()
{
    const ran = Math.random();
    if(ran>0.5)
    {
        return function()
        {
            console.log("This is function 1");       
        }
    }
    else
    {
        return function()
        {
            console.log("This is function 2");
        }
    }
}
function makeFunc(min, max)
{
    return function(num)
    {
        return (num>=min && num<=max);
    }
}
/*
Functions and objects intersect to form methods
Creating Methods
const myMath = {
    PI: 3.14,
    square: function(num)
    {
        return (num*num);
    }
}
*/
const myMath = 
{
    PI: 3.14,
    square: function(num)
    {
        return(num*num);
    },
    add(x,y)//Shorthand method to write it
    {
        return(x+y);
    }
}
/*
'This' keyword
The value of this can change and it depends on how we call the function
If this was given with another function then it will not print the name since the reference is now to the new function
*/
const dog = 
{
    name: 'Simba',
    meow: function()
    {
        console.log(`${this.name} says RUFF RUFF RUFF`);
        // console.log(this
    },
    color: "brown",
    breed: "GSD"
}
/*
Window is a top level object which consists of all the other functions
This contains all the user defined as well as the system functions
*/
/*
Using Try And Catch
These are used for exception handling
*/
try
{
    hello.toUpperCase();
}
catch
{
    console.log("ERROR!");
}
console.log("After the Error");

function yell(msg)
{
    try
    {
        console.log(msg.toUpperCase().repeat(4));
    }
    catch(e)
    {
        // console.log(e);
        console.log("Please pass a string");
    }
}
