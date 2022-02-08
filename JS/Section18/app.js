/*
JS Objects Literal
They are another data structure
The objects are properties
The properties are stored in key:value pairs
Access to the data is done through indices
This is used when different labels of data is required to be stored
This is very similar to dictionaries in python
We can access them using 2 operations
1) By using the index operator (object["member"])
2) By using the membership operator (object.member)
*** Every key that we use is converted to a string
We cannot use membership operator in case we need dynamic purposes
Nesting of objects and arrays are possible in both ways
*/
const x = 
{
    steps: 10000,
    kms: 8,
    firstName: "Kushal",
    lastName: "CG",
    2002: "born"
};
console.log(x);
const kitchen = 
{
    favNum: 92319023,
    isFunny: true,
    colors: ['red', 'orange']
};
console.log(kitchen);
console.log(kitchen["colors"], x["firstName"],x["lastName"]);
console.log(x.kms);
const combo = 
{
    arr: ["red", "orange", "yellow"]
};