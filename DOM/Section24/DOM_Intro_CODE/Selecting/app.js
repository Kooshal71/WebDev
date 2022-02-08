/*
 Selecting Elements
Methods of selecting
1) getElementById
2) getElementsByTagName
3) getElementsByClassName
4) querySelector
5) querySelectorAll
*/
let mainImage = document.getElementById("banner");
let allPara = document.getElementsByTagName("p");
let allImg = document.getElementsByTagName("img");
//mainImage will have the element having an id of banner, we can later manipulate this object.
for(let img of allImg)
{
    console.log(img.src)
}
//querySelector will select the first element having the specific argument
let secondImage = document.querySelector("img:nth-of-type(2)")
let allLink = document.querySelectorAll("a")
for(let link of allLink)
{
    console.log(link.href)
}
/*
Manipulating Elements
Methods of Manipulation
innerText - only returns the text that is actually showing on the webpage
textContent - returns all the content that is present in the given element
innerHTML - returns the tags as well as the content that is present inside a given element
*/
let firstPara = document.querySelector("p");
// firstPara.innerText = "this is the modified content."
// let anchors = document.querySelectorAll('p a');
// for(let anchor of anchors)
// {
//     anchor.innerText = "I am a link!"
// }
let heading = document.querySelector("h1");
// heading.innerHTML = "<i>Chicken</i>"
/*
Manipulating Attributes
.getAttribute() - gets the content of the given attribute
.setAttribute() - we can give 2 arguments first is the attribute and the second one is the new value of the attribute
*/
let get = heading.getAttribute('id')
let link = document.querySelector('a');
const firstBold = document.querySelector('b');
//parentElement - gives the parent of the selected element
//Every element can only have 1 parent
console.log(firstBold.parentElement)
let para = firstBold.parentElement
//children gives all the children elements in the parent element
console.log(para.children)
console.log(secondImage.previousSibling)
//They give the corresponding node and not the element
console.log(secondImage.previousElementSibling)
//This will give the actual next sibling element after the current element
//Create element will add an element to the document
const newImg = document.createElement("img");
newImg.src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipartart.com%2Fimages%2Fclipart-international-flags-4.png&f=1&nofb=1"
//We need to append the element onto the page after creating it
document.body.appendChild(newImg);
newImg.classList.add("square")
const newh3 = document.createElement("h3");
newh3.innerText = "This is at the bottom";
document.body.appendChild(newh3);
firstPara.append("I am new text", " This is the second argument")
firstPara.prepend("This is at the beginning ")
const newB = document.createElement("b");
newB.append("This is in BOLD.")
firstPara.prepend(newB);
// adjacentElement will add the element next to the target element depending on the position mentioned
