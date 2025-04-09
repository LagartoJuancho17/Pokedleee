

const botonesHeader = document.querySelectorAll(".btn-header"); //busco todos los botones del header

class Pokemon{
    //Propiedades privadas
    #id;#nombre;#tipos;#imagen;#altura;#peso;

    constructor(data){
        this.#id = data.id;
        this.#nombre = data.name;
        this.#tipos = data.types.map(type => type.type.name); //map me devuelve un array con los tipos de pokemon
        //console.log(this.#tipos);
        this.#imagen = data.sprites.other["official-artwork"].front_default; //Tengo que entrar a data > sprites > other y la llamada "official-artwork" y luego front_default  
        this.#altura = data.height;
        this.#peso = data.weight;
    }

    //Getters
    get id(){
        return this.#id;
    }
    get nombre(){
        return this.#nombre;
    }
    get tipos(){
        return this.#tipos;
    }
    get imagen(){
        return this.#imagen;
    }
    get altura(){
        return this.#altura;
    }
    get peso(){
        return this.#peso;
    }

}

function mostrarPokemon(data){ //agarro la data de fetch para usar como parametro 
    const pokemon = new Pokemon(data); //instancio la clase Pokemon y le paso la data de fetch como parametro

    let pokeId = pokemon.id.toString(); //convierto el id a string para poder usarlo en el html
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId; //si el id tiene un solo digito le agrego 00
    }else if(pokeId.length === 2){
        pokeId = "0" + pokeId; //si el id tiene 2 digitos le agrego un 0
    }


    const div = document.createElement("div"); //creo un div
    div.classList.add("pokemon"); //le agrego la clase pokemon
    div.innerHTML = `
        <p class="pokemon-id-back">${pokeId}</p>
                    <div class="pokemon-imagen">
                        <img src="${pokemon.imagen}" alt="${pokemon.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="nombre-contenedor">
                            <p class="pokemon-id">${pokeId}</p>
                            <h2 class="pokemon-nombre">${pokemon.nombre}</h2>
                        </div>
                        <div class="pokemon-tipos">
                        ${pokemon.tipos.map(tipo => `<p class="${tipo} tipo">${tipo.toUpperCase()}</p>`).join("")}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${pokemon.peso}</p>
                            <p class="stat">${pokemon.altura }</p>
                        </div>
                    </div>
    `; 

    //Agregar el div!!!
    const listaPokemon = document.querySelector("#listaPokemon"); //busco el contenedor de pokemones
    listaPokemon.appendChild(div); //agrego el div a la lista de pokemones
}

botonesHeader.forEach(boton => boton.addEventListener("click", (e) => {
    const botonId = e.currentTarget.id; //obtengo el id del boton que se clickeo
    if(botonId == "ver-todos"){
        console.log("hola presione TODOS")
        cargarTodosLosPokemones(); //si el boton es todos muestro todos los pokemones

    }
    else{
    console.log("hola presione el boton")
    listaPokemon.innerHTML = ""; //limpio la lista de pokemones

    for (let i = 1; i <= 151; i++) {
        fetch(url + i) //
            .then((response) => response.json())
            .then(data => {
                const tipos = data.types.map(type => type.type.name); //map me devuelve un array con los tipos de pokemon
                if(tipos.some(tipo => tipo.includes(botonId))){
                    mostrarPokemon(data);
                }
            })
    }
}
}));



const listaPokemon = document.querySelector("#listaPokemon");
const url = "https://pokeapi.co/api/v2/pokemon/";


//Quiero recorrer la URL 151 veces para obtener los pokemones

function cargarTodosLosPokemones(){
    listaPokemon.innerHTML = ""; //limpio la lista de pokemones

for (let i = 1; i <= 151; i++) {
    fetch(url + i) //
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}
}

cargarTodosLosPokemones(); 




