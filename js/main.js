
console.log("Hola")
const botonesHeader = document.querySelectorAll(".btn-header"); //busco todos los botones del header

class Pokemon{
    //Propiedades privadas
    #id;#nombre;#tipos;#imagen;#altura;#peso;#habilidades; //defino las propiedades privadas de la clase Pokemon

    constructor(data){
        this.#id = data.id;
        this.#nombre = data.name;
        this.#tipos = data.types.map(type => type.type.name); //map me devuelve un array con los tipos de pokemon
        //console.log(this.#tipos);
        this.#imagen = data.sprites.other["official-artwork"].front_default; //Tengo que entrar a data > sprites > other y la llamada "official-artwork" y luego front_default  
        this.#altura = data.height;
        this.#peso = data.weight;
        this.#habilidades = data.abilities.map(ability => ability.ability.name); //map me devuelve un array con las habilidades de pokemon
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
    get habilidades(){
        return this.#habilidades;
    }

}

        if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {


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


        }

//POKEDLE
console.log("Hola Pokedle")

const tablero = document.getElementById("tablero");
const formularioIntento = document.getElementById("formulario-intento");
const inputPokemon = document.getElementById("input-pokemon");
const enviarIntento = document.getElementById("enviar-intento");
const mensajes = document.getElementById("mensajes");

let pokemonSecreto;
const intentos = [];
const numeroIntentos = 10;
const url = "https://pokeapi.co/api/v2/pokemon/";

// Mapeo de IDs a generaciones
const generaciones = {
    1: [1, 151],
    2: [152, 251],
    3: [252, 386],
    4: [387, 493],
    5: [494, 649],
    6: [650, 721],
    7: [722, 809],
    8: [810, 905],
    9: [906, 1010],
};

// Mapeo de tipos a colores (puedes personalizar esto)
const coloresTipos = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    grass: '#7AC74C',
    electric: '#F7D02C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    steel: '#B7B7CE',
    dark: '#705746',
    fairy: '#D685AD',
};


async function obtenerPokemon(id) {
    try {
        const response = await fetch(url + id);
        const data = await response.json();
        return new Pokemon(data);
    } catch (error) {
        console.error("Error al obtener Pokémon (ID):", error);
        return null;
    }
}

async function obtenerPokemonPorNombre(nombre) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`); 
        if (!response.ok) {
            console.error("Error al obtener Pokémon (nombre):", response.status, response.statusText);
            return null;
        }
        const data = await response.json();
        return new Pokemon(data);
    } catch (error) {
        console.error("Error al obtener Pokémon (nombre) - Fetch error:", error);
        return null;
    }
}

function obtenerGeneracionPorId(id) {
    for (const generacion in generaciones) {
        const [min, max] = generaciones[generacion];
        if (id >= min && id <= max) {
            return parseInt(generacion);
        }
    }
    return null;
}

function crearCasilla(contenido = "", className = "") {
    const casilla = document.createElement("div");
    casilla.classList.add("casilla");
    if (className) {
        casilla.classList.add(className);
    }
    casilla.textContent = contenido;
    return casilla;
}

function mostrarIntento(intentoPokemon, pistas) {
    const intentoDiv = document.createElement("div");
    intentoDiv.classList.add("intento");

    // Nombre
    const nombreCasilla = crearCasilla(intentoPokemon.nombre.toUpperCase(), pistas.nombre);
    intentoDiv.appendChild(nombreCasilla);

    // Tipos
    const secretoTipos = pokemonSecreto.tipos || []; // Asegurarse de que secretoTipos sea un array
    for (let i = 0; i < 2; i++) {
        const tipo = intentoPokemon.tipos[i] || "";
        const pistaTipo = pistas.tipos && pistas.tipos[i];
        const tipoCasilla = crearCasilla(tipo.toUpperCase());

        if (tipo) {
            if (secretoTipos.includes(tipo)) {
                tipoCasilla.classList.add("parcial"); // El tipo existe en el Pokémon secreto
                if (secretoTipos[i] === tipo) {
                    tipoCasilla.classList.remove("parcial");
                    tipoCasilla.classList.add("correcto"); // El tipo coincide en la posición
                }
            } else {
                tipoCasilla.classList.add("incorrecto"); // El tipo no existe en el Pokémon secreto
            }

            if (coloresTipos[tipo]) {
                tipoCasilla.style.color = 'white'; // Mantener el color de texto blanco para los tipos
            }
        } else {
            tipoCasilla.classList.add("incorrecto"); // Casilla vacía para tipos inexistentes en el intento
        }
        intentoDiv.appendChild(tipoCasilla);
    }

    // Generación
    const generacionIntento = obtenerGeneracionPorId(intentoPokemon.id);
    const generacionSecreto = obtenerGeneracionPorId(pokemonSecreto.id);
    const generacionCasilla = crearCasilla(generacionIntento ? `Gen ${generacionIntento}` : "-", pistas.generacion);
    intentoDiv.appendChild(generacionCasilla);

    // Altura
    const alturaCasilla = crearCasilla(`${intentoPokemon.altura / 10} m`, pistas.altura);
    intentoDiv.appendChild(alturaCasilla);

    // Peso
    const pesoCasilla = crearCasilla(`${intentoPokemon.peso / 10} kg`, pistas.peso);
    intentoDiv.appendChild(pesoCasilla);

    // Habilidades (mostrar la primera)
    const habilidadCasilla = crearCasilla(intentoPokemon.habilidades[0] ? intentoPokemon.habilidades[0].toUpperCase() : "-", pistas.habilidad);
    intentoDiv.appendChild(habilidadCasilla);

    tablero.appendChild(intentoDiv);
}

function compararIntento(intentoPokemon) {
    if (!pokemonSecreto) return null;

    const pistas = {
        nombre: intentoPokemon.nombre.toLowerCase() === pokemonSecreto.nombre.toLowerCase() ? "correcto" : "incorrecto",
        tipos: [],
        generacion: obtenerGeneracionPorId(intentoPokemon.id) === obtenerGeneracionPorId(pokemonSecreto.id) ? "correcto" : "incorrecto",
        altura: compararNumeros(intentoPokemon.altura, pokemonSecreto.altura),
        peso: compararNumeros(intentoPokemon.peso, pokemonSecreto.peso),
        habilidad: pokemonSecreto.habilidades && intentoPokemon.habilidades && pokemonSecreto.habilidades.some(h => intentoPokemon.habilidades.includes(h)) ? "parcial" : "incorrecto",
    };

    // Comparar tipos (posición importante)
    const secretoTipos = [...pokemonSecreto.tipos]; // Crear una copia para no modificar el original
    const intentoTipos = [...intentoPokemon.tipos];

    for (let i = 0; i < 2; i++) {
        if (intentoTipos[i] && secretoTipos[i] === intentoTipos[i]) {
            pistas.tipos[i] = "correcto";
        } else if (intentoTipos[i] && secretoTipos.includes(intentoTipos[i])) {
            pistas.tipos[i] = "parcial";
        } else {
            pistas.tipos[i] = "incorrecto";
        }
    }
    while (pistas.tipos.length < 2) {
        pistas.tipos.push("incorrecto"); // Si el Pokémon tiene menos de 2 tipos
    }

    return pistas;
}

function compararNumeros(intento, secreto) {
    const diferencia = intento - secreto;
    if (diferencia === 0) {
        return "correcto";
    } else if (Math.abs(diferencia) <= 20) { // Puedes ajustar este umbral
        return "parcial";
    } else {
        return "incorrecto";
    }
}

async function seleccionarPokemonSecreto() {
    const randomIndex = Math.floor(Math.random() * 1010) + 1; // Considerar todos los Pokémon hasta la Gen 9
    pokemonSecreto = await obtenerPokemon(randomIndex);
    console.log("Pokémon secreto seleccionado:", pokemonSecreto);
}

async function manejarIntento() {
    const nombreIntento = inputPokemon.value.trim();
    inputPokemon.value = "";

    if (!nombreIntento) {
        mensajes.textContent = "Por favor, ingresa el nombre de un Pokémon.";
        return;
    }

    const pokemonIntentado = await obtenerPokemonPorNombre(nombreIntento);

    if (!pokemonIntentado) {
        mensajes.textContent = "El Pokémon ingresado no es válido.";
        return;
    }

    const pistas = compararIntento(pokemonIntentado);
    intentos.push(pokemonIntentado);
    mostrarIntento(pokemonIntentado, pistas);

    if (pokemonIntentado.nombre.toLowerCase() === pokemonSecreto.nombre.toLowerCase()) {
        mensajes.textContent = `¡Felicidades! Adivinaste el Pokémon: ${pokemonSecreto.nombre.toUpperCase()}`;
        inputPokemon.disabled = true;
        enviarIntento.disabled = true;
    } else if (intentos.length >= numeroIntentos) {
        mensajes.textContent = `¡Se acabaron los intentos! El Pokémon era: ${pokemonSecreto.nombre.toUpperCase()}`;
        inputPokemon.disabled = true;
        enviarIntento.disabled = true;
    } else {
        mensajes.textContent = `Intento ${intentos.length} de ${numeroIntentos}.`;
    }
}

async function iniciarJuego() {
    mensajes.textContent = `Tienes ${numeroIntentos} intentos para adivinar el Pokémon.`;
    await seleccionarPokemonSecreto();

    // Crear la estructura de las pistas en el tablero (encabezados)
    const encabezados = document.createElement("div");
    encabezados.classList.add("intento", "encabezados");
    encabezados.appendChild(crearCasilla("Nombre"));
    encabezados.appendChild(crearCasilla("Tipo 1"));
    encabezados.appendChild(crearCasilla("Tipo 2"));
    encabezados.appendChild(crearCasilla("Gen"));
    encabezados.appendChild(crearCasilla("Altura"));
    encabezados.appendChild(crearCasilla("Peso"));
    encabezados.appendChild(crearCasilla("Habilidad"));
    tablero.appendChild(encabezados);
}

enviarIntento.addEventListener("click", manejarIntento);
formularioIntento.addEventListener("submit", (e) => {
    e.preventDefault();
    manejarIntento();
});

iniciarJuego();

