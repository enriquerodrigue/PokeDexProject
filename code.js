const poke_container = document.getElementById("poke_container");
const title = document.getElementById("title");
title.innerHTML = sessionStorage.getItem("title")
var start = sessionStorage.getItem("start")
var end = sessionStorage.getItem("end")
if(start == null){
    start = 1;
    end = 151;
    title.innerHTML = 'Kanto Pokedex';
}
const pokemons_number = end;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};

const textColors = {
    fire: '#8a2812',
    grass: '#368a12',
    electric: '#8a8812',
    water: '#122e8a',
    ground: '#8a4412',
    rock: '#66605e',
    fairy: '#8a124a',
    poison: '#76128a',
    bug: '#608a12',
    dragon: '#12128a',
    psychic: '#688a12',
    flying: '#12848a',
    fighting: '#8a2e12',
    normal: '#c766f'
}

const fetchPokemons = async () => {
    for(let i=start; i<=pokemons_number; i++)
        await getPokemon(i);
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
}

function createPokemonCard(pokemon){
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const type = pokemon.types[0].type.name[0].toUpperCase() + pokemon.types[0].type.name.slice(1);
    var type2 = ""
    var slash = ""

    if(pokemon.types.length > 1){
        type2 = pokemon.types[1].type.name[0].toUpperCase() + pokemon.types[1].type.name.slice(1);
        slash = "/"
    }

    const color = colors[`${type.toLowerCase()}`]

    pokemonEl.style.backgroundColor = color;

    var pokemonImg = `https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`

    const pokeInnerHTML = `
        <div onmouseleave="makeNormal(${pokemon.id},'${pokemon.name}')" onmouseover="makeShiny(${pokemon.id},'${pokemon.name}')"
        onclick="sendPokemonData('${encodeURIComponent(JSON.stringify(pokemon))}')">
        <a href ="pokemon.html"/>
        <div class="img-container">
        <img src= "https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png" id="pokemon-img${pokemon.id}" alt="${name}"
        />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type"><span>Type:</span></small>
            <small class="type" style="color: ${textColors[type.toLowerCase()]};"><span>${type} </span></small>
            <small class="type"><span>${slash}</span></small>
            <small class="type" style="color: ${textColors[type2.toLowerCase()]};"><span>${type2} </span></small>
        </div>
    </div>
    `;

    pokemonEl.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokemonEl);
}
fetchPokemons();

function makeShiny(id, name){
    document.getElementById(`pokemon-img${id}`).src = `https://img.pokemondb.net/sprites/home/shiny/${name}.png`
}

function makeNormal(id, name){
	document.getElementById(`pokemon-img${id}`).src = `https://img.pokemondb.net/sprites/home/normal/${name}.png`
}

function sendPokemonData(pokemon){

    sessionStorage.setItem("pokemon",pokemon)
}
