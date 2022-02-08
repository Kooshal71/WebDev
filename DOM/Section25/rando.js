const btns = document.querySelectorAll("button");
const h1 = document.querySelector("h1");
// btn.addEventListener('click', function()
// {
//     // console.log("eww")
//     const color = random();
//     document.body.style.backgroundColor = color;
//     h1.innerHTML = color;
// })
for(let btn of btns)
{
    btn.addEventListener('click', function(){
        let color = random();
        btn.style.backgroundColor = color;
    })
}

function random()
{
    const r = Math.ceil(Math.random() *255)+1
    const g = Math.ceil(Math.random() *255)+1
    const b = Math.ceil(Math.random() *255)+1
    return `rgb(${r},${g},${b})`;
}