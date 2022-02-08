/*
Functions
These are used very similar to other PL and has the same benefits
JS is a function oriented PL and this will provide more advantages compared to cpp 
Syntax - 
    function name(parameters)
    {
        functions body;
        return value;
    }
We can define the function after declaring the function
This has something to do with hoisting
Parameters are just accepted without the data type
*/
function grumpy()//function definition
{
    console.log("Leave me alone");
    console.log("I'm very grumpy");
    console.log("Not a good time");

}
//grumpy();     function declaration
// function die(limit)
// {
//     // limit = parseInt(limit);
//     if(limit)
//     console.log(Math.floor(Math.round()*limit)+1);
// }
// let x = prompt("Please enter the sides of the die");

function greet(firstName, lastName)
{
    console.log(`Hey There, ${firstName} ${lastName[0]}.`);
}

function repeat(str, num)
{
    let x = 0;
    while(x<num)
    {
        console.log(str);
        x++;
    }
}

function add(x, y)
{
    let sum = x+y;
    return sum;
}
//we can only return 1 thing not more than that