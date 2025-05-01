
console.log("Hola")
const botonesHeader = document.querySelectorAll(".btn-header"); //busco todos los botones del header

//Polimorfismo para preguntas usando getter. Al menos 2 subclases para 2 tipos de preguntas, pregunta imgagen, 
//Clase incial pregunta, y sbuclase por tipo de pregunta. Mas polimorfismo, Crear Pantalla Admin para crear una pregunta nueva.


class Pokemon{
    //Propiedades privadas
    #id;#nombre;#tipos;#imagen;#altura;#peso;#habilidades; //defino las propiedades privadas de la clase Pokemon

    constructor(data){
        //destructuring
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

        if (window.location.pathname.includes("index.html") || window.location.pathname === "/") { //Solo actua si esta en el index.html porque sino rompe la otra pagina


function mostrarPokemon(data) {
    const pokemon = new Pokemon(data);

    let pokeId = pokemon.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
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
                <p class="stat">${pokemon.altura}</p>
            </div>
            <button class="btn-eliminar" data-id="${pokemon.id}">Eliminar</button>
        </div>
    `;

    const listaPokemon = document.querySelector("#listaPokemon");
    listaPokemon.appendChild(div);

    // Agregar evento al botón de eliminar
    div.querySelector(".btn-eliminar").addEventListener("click", () => eliminarPokemon(pokemon.id));
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
async function cargarTodosLosPokemones(){
    listaPokemon.innerHTML = ""; //limpio la lista de pokemones
/*
for (let i = 1; i <= 151; i++) {
    fetch(url + i) //
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}*/

for (let i = 1; i <= 151; i++) {
    try{
        const response = await fetch(url + i); //hago el fetch a la url
        const data = await response.json(); //convierto la respuesta a json
        mostrarPokemon(data); //llamo a la funcion mostrarPokemon y le paso la data
    } catch (error){
        console.error("Error al cargar Pokémon:", error); //si hay un error lo muestro en la consola
    }
}
}

cargarTodosLosPokemones(); 


//AGREGAR POKEMON NUEVOOOO
document.getElementById("btn-crear-pokemon").addEventListener("click", () => {
    const password = prompt("Ingrese la contraseña de administrador:");
    if (password === "admin123") { // CONTRASEÑA ADMIN
        const nombre = prompt("Ingrese el nombre del Pokémon:");
        const tipos = prompt("Ingrese los tipos del Pokémon (separados por comas):").split(",");
        const imagen = prompt("Ingrese la URL de la imagen del Pokémon:");
        const altura = parseFloat(prompt("Ingrese la altura del Pokémon (en metros):")); // Convertir a decímetros
        const peso = parseFloat(prompt("Ingrese el peso del Pokémon (en kilogramos):")); // Convertir a hectogramos
        const habilidades = prompt("Ingrese las habilidades del Pokémon (separadas por comas):").split(","); // Convertir a array de habilidades 

        const nuevoPokemon = {
            id: Math.floor(Math.random() * 1000) + 152, // Generar un ID único para el nuevo Pokémon (entre 152 y 1152) 
            name: nombre,
            types: tipos.map(tipo => ({ type: { name: tipo.trim() } })),
            sprites: { other: { "official-artwork": { front_default: imagen } } },
            height: altura,
            weight: peso,
            abilities: habilidades.map(habilidad => ({ ability: { name: habilidad.trim() } }))
        };

        // Guardar en localStorage
        guardarPokemonEnLocalStorage(nuevoPokemon);
        // Guardar como Pokémon secreto para el Pokedle
        localStorage.setItem("pokemonSecreto", JSON.stringify(nuevoPokemon));


        mostrarPokemon(nuevoPokemon); // REUTILIZACIOOON
        alert("¡Nuevo Pokémon creado exitosamente!");
    } else {
        alert("Contraseña incorrecta. No tienes permisos para crear un Pokémon.");
    }
});
// Función para guardar el Pokémon en localStorage
function guardarPokemonEnLocalStorage(pokemon) {
    let pokemonesGuardados = JSON.parse(localStorage.getItem("pokemones")) || []; // Obtener los pokemon existentes
    pokemonesGuardados.push(pokemon); // Agregar el nuevo Pokémon
    localStorage.setItem("pokemones", JSON.stringify(pokemonesGuardados)); // Guardar en localStorage
}
function cargarPokemonesDesdeLocalStorage() {
    const pokemonesGuardados = JSON.parse(localStorage.getItem("pokemones")) || [];
    pokemonesGuardados.forEach(pokemon => mostrarPokemon(pokemon)); // Mostrar cada Pokémon guardado
}

function eliminarPokemon(id) {
    const password = prompt("Ingrese la contraseña de administrador:");
    if(password !== "admin123") { // Cambia "admin123" por la contraseña que desees
        alert("Contraseña incorrecta. No tienes permisos para eliminar un Pokémon.");
        return;
    }else{
    let pokemonesGuardados = JSON.parse(localStorage.getItem("pokemones")) || [];
    pokemonesGuardados = pokemonesGuardados.filter(pokemon => pokemon.id !== id); // Filtrar el Pokémon a eliminar
    localStorage.setItem("pokemones", JSON.stringify(pokemonesGuardados)); // Actualizar localStorage

    // Eliminar el Pokémon de la lista en la página
    const listaPokemon = document.querySelector("#listaPokemon");
    const pokemonDiv = listaPokemon.querySelector(`.btn-eliminar[data-id="${id}"]`).parentElement.parentElement;
    listaPokemon.removeChild(pokemonDiv);

    alert("¡Pokémon eliminado exitosamente!");
    
    }
}


// Llamar a la función al cargar la página
cargarPokemonesDesdeLocalStorage();
        }



//POKEDLE
if (window.location.pathname.includes("pokedle.html") || window.location.pathname === "/") { //Solo funciona si esta en el index.html porque sino rompe la otra pagina

console.log("Hola Pokedle")

const tablero = document.getElementById("tablero");
const formularioIntento = document.getElementById("formulario-intento");
const inputPokemon = document.getElementById("input-pokemon");
const enviarIntento = document.getElementById("enviar-intento");
const mensajes = document.getElementById("mensajes");
const url = "https://pokeapi.co/api/v2/pokemon/";

let pokemonSecreto; //Varibale para pokemon secreto
const intentos = []; 
const numeroIntentos = 10;


// Mapeo de ID a generaciones 
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


//Obtengo los datos del pokemon secreto 
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

//Obtengo los datos del pokemon por nombre que ingresa el usuario
async function obtenerPokemonPorNombre(nombre) { 
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
        const data = await response.json();
        return new Pokemon(data);
    } catch (error) {
        console.error("Error al obtener Pokémon (nombre) - Fetch error:", error);
        return null;
    }
}

//Obtengo la generacion del pokemon secreto con el mapeo del array
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
    const secretoTipos = pokemonSecreto.tipos || []; // Asegurarse de que secretoTipos un array
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


// Comparar números (altura y peso) 
function compararNumeros(intento, secreto) {
    const diferencia = intento - secreto;
    if (diferencia === 0) {
        return "correcto";
    } else if (Math.abs(diferencia) <= 20) { //Umbral de tolerancia si es muy cercano o no!
        return "parcial";
    } else {
        return "incorrecto";
    }
}


//CAMBIAR ESTOOOOOOOO
/*
async function seleccionarPokemonSecreto() {
    const randomIndex = Math.floor(Math.random() * 151) + 1; // SOlo los pokemon de gen 1 
    pokemonSecreto = await obtenerPokemon(randomIndex); 
    console.log("Pokémon secreto seleccionado:", pokemonSecreto);
}*/

//SELECCIONO MANUALMENTE EL POKEMON
/*
async function seleccionarPokemonSecreto(id) {
    try {
        pokemonSecreto = await obtenerPokemon(id); // Obtiene el Pokémon usando el ID proporcionado
        console.log("Pokémon secreto seleccionado:", pokemonSecreto);
    } catch (error) {
        console.error("Error al seleccionar el Pokémon secreto:", error);
    }
}*/

async function seleccionarPokemonSecreto() {
    const pokemonSecretoGuardado = localStorage.getItem("pokemonSecreto");

    if (pokemonSecretoGuardado) {
        // Si hay un Pokémon secreto guardado, lo uso
        const data = JSON.parse(pokemonSecretoGuardado);
        pokemonSecreto = new Pokemon(data); // Crear una instancia de la clase Pokemon
        console.log("Pokémon secreto seleccionado desde localStorage:", pokemonSecreto);
    } else {
        // Aleatorio
        const randomIndex = Math.floor(Math.random() * 151) + 1; // Solo los Pokémon de Gen 1
        pokemonSecreto = await obtenerPokemon(randomIndex);
        console.log("Pokémon secreto seleccionado aleatoriamente:", pokemonSecreto);
    }
}


async function manejarIntento() {
    const nombreIntento = inputPokemon.value; //Valor ingresado por el usuuario 
    inputPokemon.value = "";

    if (!nombreIntento) {
        mensajes.textContent = "Iingresa el nombre de un Pokémon.";
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
    mensajes.textContent = `Tienes ${numeroIntentos} intentos para adivinar el Pokemon.`;
    await seleccionarPokemonSecreto(); //SACAR ESTO SI NO QUIERO QUE SELECCIONE UN POKEMON RANDOM

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

}


// PREGUNTAS

// Clase base Pregunta
class Pregunta {
    constructor(pokemon) {
        this.pokemon = pokemon;
    }

    get tipo() {
        return 'Genérica';
    }

    mostrarPregunta() {
        return `<p>Pregunta genérica</p>`;
    }

    verificarRespuesta(respuestaUsuario) {
        return false;
    }
}

// Pregunta: Qué Pokémon es este? (con imagen)
class PreguntaImagen extends Pregunta {
    get tipo() {
        return 'Imagen';
    }

    mostrarPregunta() {
        return `
            <p>¿Cuál es el nombre de este Pokémon?</p>
            <img src="${this.pokemon.imagen}" alt="Pokemon" width="150"><br>
            <input type="text" id="respuesta" placeholder="Escribe el nombre">
            <button onclick="verificar()">Verificar</button>
            <div id="resultado"></div>
        `;
    }

    verificarRespuesta(respuestaUsuario) {
        return this.pokemon.nombre.toLowerCase() === respuestaUsuario.trim().toLowerCase();
    }
}

// Pregunta: ¿Cuál es uno de sus tipos? (con recursividad)
class PreguntaTipos extends Pregunta {
    get tipo() {
        return 'Tipos';
    }

    mostrarPregunta() {
        return `
            <p>¿Cuál es uno de los tipos de ${this.pokemon.nombre}?</p>
            <input type="text" id="respuesta" placeholder="Escribe un tipo">
            <button onclick="verificar()">Verificar</button>
            <div id="resultado"></div>
        `;
    }

    verificarRespuesta(respuestaUsuario) {
        // Recursividad para buscar dentro del array de tipos
        function buscarTipo(tipos, respuesta) {
            if (tipos.length === 0) return false;
            const [primero, ...resto] = tipos;
            if (primero.toLowerCase() === respuesta.trim().toLowerCase()) return true;
            return buscarTipo(resto, respuesta);
        }

        return buscarTipo(this.pokemon.tipos, respuestaUsuario);
    }
}

// Variable global para mantener la pregunta activa
let preguntaActual = null;

// Evento para generar una nueva pregunta aleatoria
document.getElementById('generar').addEventListener('click', async () => {
    const id = Math.floor(Math.random() * 151) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    const pokemon = new Pokemon(data);

    // Elegimos tipo de pregunta de forma aleatoria
    const tipoPregunta = Math.random() > 0.5 ? 'imagen' : 'tipo'; //50 50 de probabilidades
    preguntaActual = tipoPregunta === 'imagen' 
        ? new PreguntaImagen(pokemon) 
        : new PreguntaTipos(pokemon);

    // Mostrar la pregunta
    const container = document.getElementById('preguntaContainer');
    container.innerHTML = `<strong>Tipo:</strong> ${preguntaActual.tipo}<br>${preguntaActual.mostrarPregunta()}`;
});

// Función global para verificar la respuesta del usuario
window.verificar = function () {
    const input = document.getElementById('respuesta');
    const resultado = document.getElementById('resultado');

    if (!preguntaActual) return;

    const esCorrecta = preguntaActual.verificarRespuesta(input.value);
    resultado.innerHTML = esCorrecta
      ? '<span style="color: green;">¡Correcto! </span>'
      : `<span style="color: red;">Incorrecto </span>`;
  };