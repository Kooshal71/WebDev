/*
The normal comparison operators
> - greater than
< - lesser than
<= - lesser than or equal
>= - greater than or equal
They all return boolean values
While comparing characters They use Unicode values
Some unique comparison operators
== - equality
    This is used to check for equality of value but not of type
    It coerces them to the same type and then compares them
    This will result in interesting results
!= - not equality
    This is similar to == But then it checks for inequality of values
    0 is false
    null is undefined
=== - strict equality(more used)
    This is used to check for both the value and the type of data
    1 == '1' will give true
    1 === '1' will give false
    Everything that is false in equality will be false in strict equality but the 
    converse need not hold good
!== - strict non equality
    This is the opposite of ===
console.log() - prints the arguments to the console
alert() - creates a pop up in the website
prompt() - this asks the user to enter a number
            accepts all inputs with type string
parseInt() - converts the strings to integer
*/
console.log("Hello There!");
let tot = 19;
if(tot>=18)
{
    console.log("Welcome!");
}
else if(tot<18)
{
    console.log("Please Leave");
}
else
{
    console.log("Dumb Ass");
}
// let pass = prompt("Please enter a new password")
// if(pass.length >= 6)
// {
//     if(pass.indexOf(' ') === -1)
//     {
//         console.log("Password accepted");
//     }
//     else
//     {
//         console.log("Spaces are not allowed")
//     }
// }
// else
// {
//     console.log("Password too short");
// }
// && - logical and 
// || - logical or
// ! - logical not
let age = -1;
if(age>0 && (age<5 || age>=65))
{
    console.log("Free");
}
else if(age>=5 && age<10)
{
    console.log("$10");
}
else if(age>=10 && age<65)
{
    console.log("$20");
}
else
{
    console.log("Enter a valid age");
}
//Switch
const day = 1;
switch(day%7)
{
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    default:
        console.log("Holiday");
}