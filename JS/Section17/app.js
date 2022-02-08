/*
Arrays are a data structure
Ordered collection of values
Syntax - 
    let name = [values];
array can hold data of different types
They can be accessed by using the index system
It also has the property 'length'
Nesting of arrays is possible - multidimensional arrays
Random Access to the array
Index starts from 0
We can change the individual elements present in the array
This was not possible in the case of strings
We do not need to add the elements to an array in an order
If we add beyond the last existing element then it will just place empty slots
and the length of the array will change
Array Methods
    Push (add to end)
    Pop (delete from end)
        These are like stack
    Shift (delete from start)
    Unshift (add to start)
        These are like queue
    Concat
        array3 = array1.concat(array2) - array 3 will be concatenated array of first 2 arrays
    includes(ele)
        checks if the element is present in the given array
    indexOf(ele)
        returns the index of the first occurrence of the element
    reverse()
        reverses the array and the original array is changed
    slice(start, stop)
        returns a part of the array from start index excluding stop index
    splice(start, deletenum, ele)
        changes the original array
        it inserts after the index and deletes any number of elements and then inserts the element
    sort()
        it converts the elements to strings and then compares them using UTF-16
Equality
    [1] === [1]
    this will return false since it checks the elements by checking the memory of the array
    It follows the same change in list as python does.
    This happens because both the pointer holds the same memory.
Const
    const arr = [values]
    This will make sure that the pointer to the array will not change
    We can still change the contents of the array but we cannot assign the array to a new location.
    This is a desirable feature since we do not want to lose the access to the given array
Multidimensional Arrays
    This is nothing but nested arrays and we can have many arrays inside arrays
    
*/
let x = [1,2,4];
x.push(5);
x.push(7);
console.log(x);
x.pop();
x.shift()
console.log(x);
x.unshift(10);
console.log(x);
x.splice(0,0,20);
console.log(x);
x.sort()
console.log(x);
