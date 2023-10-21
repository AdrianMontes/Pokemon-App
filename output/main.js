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
        if (tipos_filtro.length == 0) {
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
                imagenes[i].src = lista_actual[j].sprites.front_default;
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
        let lista_actual = yield Promise.all(lista_pokemon);
        lista_filtros = [];
        for (let i = 0; i < lista_pokemon.length; i++) {
            for (let j = 0; j < tipos_filtro.length; j++) {
                if (lista_actual[i].types[0].type.name == tipos_filtro[j] || (lista_actual[i].types[1] && lista_actual[i].types[1].type.name == tipos_filtro[j])) {
                    lista_filtros.push(lista_actual[i]);
                }
            }
        }
        cargarDatos();
    });
}
function calcularDistancia(a, b) {
    if (a.length === 0)
        return b.length;
    if (b.length === 0)
        return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let i = 0; i <= a.length; i++) {
        matrix[0][i] = i;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            const cost = a[j - 1] === b[i - 1] ? 0 : 1;
            matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
        }
    }
    return matrix[b.length][a.length];
}
function buscarPokemon() {
    return __awaiter(this, void 0, void 0, function* () {
        let lista_actual = yield Promise.all(lista_filtros);
        let pokemon_similares = lista_actual.filter((pokemon_actual) => {
            let distancia = calcularDistancia(buscar.value.toLowerCase(), pokemon_actual.name.toLowerCase());
            return distancia <= 2;
        });
        lista_filtros = pokemon_similares;
        if (pokemon_similares.length > 0) {
            alert(pokemon_similares[0].name);
        }
        else {
            alert("no");
        }
        cargarDatos();
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
cargarDatos();
//Eventos
document.addEventListener("DOMContentLoaded", function () {
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
anterior.addEventListener("click", function () {
    pasarLista(-20);
});
siguiente.addEventListener("click", function () {
    pasarLista(20);
});
