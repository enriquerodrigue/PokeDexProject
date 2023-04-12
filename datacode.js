const poke_data = document.getElementById("poke_data");
var pokemon = sessionStorage.getItem("pokemon")
pokemon = JSON.parse(decodeURIComponent(pokemon))

var pokemonEntry

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

const getPokemonEntry = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    const res = await fetch(url);
    pokemonEntry = await res.json();
    createPokemonLayout(pokemonEntry)
}
getPokemonEntry(pokemon.id)
function createPokemonLayout(pokemonEntry) {
const pokemonEl = document.createElement("div");

const color = colors[`${pokemon.types[0].type.name}`]

pokemonEl.style.backgroundColor = color;

const pokeInnerHTML = `
<div class="data">
    <div class="maindata">
        <div class="img">
            <img src="https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png"/>
        </div>
        <div class="name-description">
            <div class="name-id">
                <h1>${capitalizedWord(pokemon.name)}</h1>
                <h1>#${pokemon.id}</h1>
            </div>
            <div class="typing">
                <h3>Type:</h3>
                <p>${getTypes(pokemon.types)}</p>
            </div>
            <div>
                <p>${pokemonEntry.flavor_text_entries[0].flavor_text}</p>
            </div>
        </div>
    </div>
    <div class="stats">
        <div>
            <h3>Height</h3>
            <p>${pokemon.height}"</p>
        </div>
        <div>
            <h3>Category</h3>
            <p>${pokemonEntry.genera[7].genus}</p>
        </div>
        <div>
            <h3>Weight</h3>
            <p>${pokemon.weight} lbs</p>
        </div>
        <div>
            <h3>Abilities</h3>
            <p>${getAbilities(pokemon.abilities)}</p>
        </div>

    </div>
</div>
`

pokemonEl.innerHTML = pokeInnerHTML

poke_data.appendChild(pokemonEl)

}
function capitalizedWord(name){
    var name = name.charAt(0).toUpperCase() + name.slice(1)
    return name
}
function getTypes(types){
    var typesStr = ""
    types.forEach(element => {
        typesStr += capitalizedWord(element.type.name) + "/"
    });
    return typesStr.substring(0,typesStr.length-1)
}
function getAbilities(abilities){
    var abilitiesStr = ""
    abilities.forEach(element => {
        abilitiesStr += capitalizedWord(element.ability.name) + ", "
        
    });
    return abilitiesStr.substring(0,abilitiesStr.length-2)
}
