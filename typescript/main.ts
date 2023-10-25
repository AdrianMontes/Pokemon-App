//Funciones
async function obtenerDatos(id: number) {
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/" + id + "/";

    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const datos = await response.json();
            return datos;
        }
    } catch (error) {
        console.log(error);
    }
}

async function obtenerYMostrarDatos(i: number) {
    try {
        const datos = await obtenerDatos(i);
        return datos;
    } catch (error) {
        return "Error: " + error;
    }
}

async function cargarDatos() {
    let lista_actual: any;
    if (tipos_filtro.length == 0 && buscar.value == "") {
        lista_actual = await Promise.all(lista_pokemon);
    } else {
        lista_actual = await Promise.all(lista_filtros);
    }

    let i: number = 0;
    for (let j: number = id_inicial - 1; j < id_inicial + 20; j++) {
        if (j < lista_actual.length) {
            marcos[i].style.display = "block";
            nombres[i].textContent = lista_actual[j].name;
            imagenes[i].src = lista_actual[j].sprites.other["official-artwork"].front_default;
            numeros[i].textContent = "#" + lista_actual[j].id; 
        }
        else {
            marcos[i].style.display = "none";
        }
        i++;
    }
}

function pasarLista(valor: number) {
    id_inicial += valor;
    if (id_inicial < 1) {
        id_inicial = 1;
    }
    else if (id_inicial > 1017) {
        id_inicial = 1017;
    }
    cargarDatos();
}

async function filtrarPokemon() {
    id_inicial = 1;
    let lista_actual = await Promise.all(lista_pokemon);
    lista_filtros = [];

    if (tipos_filtro.length == 0) {
        for (let i: number = 0; i < lista_actual.length; i++) {
            if (lista_actual[i].name.toLowerCase().startsWith(buscar.value.toLowerCase())) {
                lista_filtros.push(lista_actual[i]);
            }
        }
    } else {
        for (let i: number = 0; i < lista_pokemon.length; i++) {
            for (let j: number = 0; j < tipos_filtro.length; j++) {
                if (lista_actual[i].types[0].type.name == tipos_filtro[j] || (lista_actual[i].types[1] && lista_actual[i].types[1].type.name == tipos_filtro[j])) {
                    if (buscar.value == "" || lista_actual[i].name.toLowerCase().startsWith(buscar.value.toLowerCase())) {
                        lista_filtros.push(lista_actual[i]);
                    }
                }
            }
        }
    }
    
    cargarDatos();
}

async function cargarPokemon(pokemon: string) {
    let pokemon_actual: any = await devolverPokemon(pokemon);

    pokemon_nombre.textContent = pokemon_actual.name;
    pokemon_imagen.src = pokemon_actual.sprites.other["official-artwork"].front_default;
    pokemon_numero.textContent = "#" + pokemon_actual.id;
    pokemon_experiencia.textContent = pokemon_actual.base_experience;
    pokemon_altura.textContent = pokemon_actual.height;
    pokemon_peso.textContent = pokemon_actual.weight;
    pokemon_HP.textContent = pokemon_actual.stats[0].base_stat;
    pokemon_ataque.textContent = pokemon_actual.stats[1].base_stat;
    pokemon_defensa.textContent = pokemon_actual.stats[2].base_stat;
    pokemon_ataque_especial.textContent = pokemon_actual.stats[3].base_stat;
    pokemon_defensa_especial.textContent = pokemon_actual.stats[4].base_stat;
    pokemon_velocidad.textContent = pokemon_actual.stats[5].base_stat;
    pokemon_tipo1.textContent = pokemon_actual.types[0].type.name;
    if (pokemon_actual.types[1]) {
        pokemon_tipo2.textContent = pokemon_actual.types[1].type.name;
    } else {
        pokemon_tipo2.textContent = "none";
    }
    
}

async function devolverPokemon(pokemon: string): Promise<any> {
    let lista_actual = await Promise.all(lista_pokemon);

    for (let i: number = 0; i < lista_actual.length; i++) {
        if (lista_actual[i].name == pokemon) {
            return lista_actual[i];
        }
    }
}

//Variables
var tipos_filtro: string[] = [];
var lista_pokemon: any = [];
var id_inicial: number = 1;
for (let i: number = 1; i <= 1017; i++) {
    lista_pokemon.push(obtenerYMostrarDatos(i));
}
var lista_filtros: any = lista_pokemon;

var buscar: any = document.getElementById("input_buscar");
var tipos: any = document.querySelectorAll(".tipo");

var marcos: any = document.querySelectorAll(".marco");
var nombres = document.querySelectorAll(".nombre");
var imagenes: any = document.querySelectorAll(".imagen");
var numeros = document.querySelectorAll(".numero");
var anterior: any = document.getElementById("anterior");
var siguiente: any = document.getElementById("siguiente");

var pokemon_cargado: string;
var pokemon_nombre: any = document.getElementById("detalle_nombre");
var pokemon_imagen: any = document.getElementById("detalle_imagen");
var pokemon_numero: any = document.getElementById("detalle_numero");
var shiny: any = document.getElementById("shiny_boton");
var pokemon_experiencia: any = document.getElementById("info_base_experience");
var pokemon_altura: any = document.getElementById("info_height");
var pokemon_peso: any = document.getElementById("info_weight");
var pokemon_HP: any = document.getElementById("info_HP");
var pokemon_ataque: any = document.getElementById("info_attack");
var pokemon_defensa: any = document.getElementById("info_defense");
var pokemon_ataque_especial: any = document.getElementById("info_spattack");
var pokemon_defensa_especial: any = document.getElementById("info_spdefense");
var pokemon_velocidad: any = document.getElementById("info_speed");
var pokemon_tipo1: any = document.getElementById("info_type1");
var pokemon_tipo2: any = document.getElementById("info_type2");

cargarDatos();

//Eventos
buscar.addEventListener("input", function () {
    filtrarPokemon();
});

tipos.forEach((boton: any) => {
    boton.addEventListener("click", function () {
        if (boton.classList.contains("is-primary")) {
            boton.classList.remove("is-primary");
            let indice = tipos_filtro.indexOf(boton.textContent);
            tipos_filtro.splice(indice, 1);
        } else {
            boton.classList.add("is-primary");
            tipos_filtro.push(boton.textContent);
        }
        filtrarPokemon();
    });
});

marcos.forEach(function (marco: any) {
    marco.addEventListener("click", function () {
        pokemon_cargado = marco.querySelector(".nombre").textContent;
        localStorage.setItem("pokemon_cargado", pokemon_cargado);
    });
});

anterior.addEventListener("click", function () {
    pasarLista(-20);
});
siguiente.addEventListener("click", function () {
    pasarLista(20);
});