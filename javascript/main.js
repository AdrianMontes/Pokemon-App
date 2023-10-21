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
function obtenerDatos(id_inicial) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiUrl = "https://pokeapi.co/api/v2/pokemon/" + id_inicial + "/";
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
            return i + ": " + datos.name;
        }
        catch (error) {
            return "Error: " + error;
        }
    });
}
const lista_pokemon = [];
for (let i = 1; i < 21; i++) {
    lista_pokemon.push(obtenerYMostrarDatos(i));
}
Promise.all(lista_pokemon)
    .then(resultados => {
    for (const resultado of resultados) {
        console.log(resultado);
    }
})
    .catch(error => {
    console.error('Error:', error);
});
