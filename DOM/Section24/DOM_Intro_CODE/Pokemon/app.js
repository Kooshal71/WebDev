// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
const container = document.querySelector("section");
const newImg = document.createElement('img')
newImg.src = `${baseURL}1.png`;
// container.appendChild(newImg)
for(let i = 1; i<899; i++)
{
    const pokemon = document.createElement("div");
    pokemon.classList.add("pokemon")
    const label = document.createElement("span");
    label.innerText = i;
    const newImg  = document.createElement("img");
    newImg.src = `${baseURL}${i}.png`
    pokemon.appendChild(newImg);
    pokemon.appendChild(label);
    container.appendChild(pokemon)    
}