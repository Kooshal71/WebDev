// const btn = document.querySelector("button")
// btn.onclick = function()
// {
//     console.log("You clicked me!");
//     console.log("I hope it worked!");
// }

// function scream()
// {
//     console.log("AAAAAAAAAAHHH");
//     console.log("STOP TOUCHING ME")
// }

// btn.onmouseenter = scream;
// // AddEventListener
// btn.addEventListener("dblclick", () =>
// {
//     alert("You have double clicked!")
// })
// // If we want to run more than 1 function for a specific property then we need to use addEventListener

const btn = document.querySelector("button");
btn.addEventListener("click", function(evnt){
    console.log(evnt);
    // console.log(evnt.code);
})

const input = document.querySelector("input");
input.addEventListener("keydown", function(evnt){
    console.log(evnt.key);
    console.log(evnt.code);
})
window.addEventListener("keydown", function(e){
    switch(e.code){
        case "ArrowUp":
            console.log("UP!")
            break;
        case "ArrowDown":
            console.log("DOWN!");
            break;
    }
})
// input.addEventListener("keyup", function(evnt){
//     console.log(evnt);
// })