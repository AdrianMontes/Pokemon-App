"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Funciones
function obtenerDatos(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiUrl = "https://pokeapi.co/api/v2/pokemon/" + id + "/";
        try {
            const response = yield fetch(apiUrl);
            if (response.ok) {
                const datos = yield response.json();
                return datos;
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
function obtenerYMostrarDatos(i) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const datos = yield obtenerDatos(i);
            return datos;
        }
        catch (error) {
            return "Error: " + error;
        }
    });
}
function cargarDatos() {
    return __awaiter(this, void 0, void 0, function* () {
        let lista_actual;
        if (tipos_filtro.length == 0 && buscar.value == "") {
            lista_actual = yield Promise.all(lista_pokemon);
        }
        else {
            lista_actual = yield Promise.all(lista_filtros);
        }
        let i = 0;
        for (let j = id_inicial - 1; j < id_inicial + 20; j++) {
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
    });
}
function pasarLista(valor) {
    id_inicial += valor;
    if (id_inicial < 1) {
        id_inicial = 1;
    }
    else if (id_inicial > 1017) {
        id_inicial = 1017;
    }
    cargarDatos();
}
function filtrarPokemon() {
    return __awaiter(this, void 0, void 0, function* () {
        id_inicial = 1;
        let lista_actual = yield Promise.all(lista_pokemon);
        lista_filtros = [];
        if (tipos_filtro.length == 0) {
            for (let i = 0; i < lista_actual.length; i++) {
                if (lista_actual[i].name.toLowerCase().startsWith(buscar.value.toLowerCase())) {
                    lista_filtros.push(lista_actual[i]);
                }
            }
        }
        else {
            for (let i = 0; i < lista_pokemon.length; i++) {
                for (let j = 0; j < tipos_filtro.length; j++) {
                    if (lista_actual[i].types[0].type.name == tipos_filtro[j] || (lista_actual[i].types[1] && lista_actual[i].types[1].type.name == tipos_filtro[j])) {
                        if (buscar.value == "" || lista_actual[i].name.toLowerCase().startsWith(buscar.value.toLowerCase())) {
                            lista_filtros.push(lista_actual[i]);
                        }
                    }
                }
            }
        }
        cargarDatos();
    });
}
function cargarPokemon(pokemon) {
    return __awaiter(this, void 0, void 0, function* () {
        let pokemon_actual = yield devolverPokemon(pokemon);
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
        }
        else {
            pokemon_tipo2.textContent = "none";
        }
    });
}
function devolverPokemon(pokemon) {
    return __awaiter(this, void 0, void 0, function* () {
        let lista_actual = yield Promise.all(lista_pokemon);
        for (let i = 0; i < lista_actual.length; i++) {
            if (lista_actual[i].name == pokemon) {
                return lista_actual[i];
            }
        }
    });
}
//Variables
var tipos_filtro = [];
var lista_pokemon = [];
var id_inicial = 1;
for (let i = 1; i <= 1017; i++) {
    lista_pokemon.push(obtenerYMostrarDatos(i));
}
var lista_filtros = lista_pokemon;
var buscar = document.getElementById("input_buscar");
var tipos = document.querySelectorAll(".tipo");
var marcos = document.querySelectorAll(".marco");
var nombres = document.querySelectorAll(".nombre");
var imagenes = document.querySelectorAll(".imagen");
var numeros = document.querySelectorAll(".numero");
var anterior = document.getElementById("anterior");
var siguiente = document.getElementById("siguiente");
var pokemon_cargado;
var pokemon_nombre = document.getElementById("detalle_nombre");
var pokemon_imagen = document.getElementById("detalle_imagen");
var pokemon_numero = document.getElementById("detalle_numero");
var shiny = document.getElementById("shiny_boton");
var pokemon_experiencia = document.getElementById("info_base_experience");
var pokemon_altura = document.getElementById("info_height");
var pokemon_peso = document.getElementById("info_weight");
var pokemon_HP = document.getElementById("info_HP");
var pokemon_ataque = document.getElementById("info_attack");
var pokemon_defensa = document.getElementById("info_defense");
var pokemon_ataque_especial = document.getElementById("info_spattack");
var pokemon_defensa_especial = document.getElementById("info_spdefense");
var pokemon_velocidad = document.getElementById("info_speed");
var pokemon_tipo1 = document.getElementById("info_type1");
var pokemon_tipo2 = document.getElementById("info_type2");
cargarDatos();
//Eventos
buscar.addEventListener("input", function () {
    filtrarPokemon();
});
tipos.forEach((boton) => {
    boton.addEventListener("click", function () {
        if (boton.classList.contains("is-primary")) {
            boton.classList.remove("is-primary");
            let indice = tipos_filtro.indexOf(boton.textContent);
            tipos_filtro.splice(indice, 1);
        }
        else {
            boton.classList.add("is-primary");
            tipos_filtro.push(boton.textContent);
        }
        filtrarPokemon();
    });
});
marcos.forEach(function (marco) {
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
