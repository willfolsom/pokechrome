import { Pokemon } from './types/Pokemon';

const pokeapiUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
const getOptions: object = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

export class PokeApiService {
    getPokemonByName(name: string): Promise<Pokemon> {
        return fetch(pokeapiUrl + `${name}`, getOptions)
            .then(res => res.json())
            .then(res => this.formatPokemon(res))
            .catch()
    };

    getPokemonById(id: number): Promise<Pokemon> {
        return fetch(pokeapiUrl + `${id}`, getOptions)
            .then(res => res.json())
            .then(res => this.formatPokemon(res))
            .catch();
    };

    getPokemonImageById(id: number): Promise<string> {
        return fetch(pokeapiUrl + `${id}`, getOptions)
            .then(res => res.json())
            .then(res => this.formatPokemon(res).sprites.front_default)
            .catch();
    };

    formatPokemon(pokemonData: any): Pokemon {
        return {
            abilities: pokemonData.abilities,
            id: pokemonData.id,
            sprites: {
                front_default: pokemonData.sprites.front_default
            },
            name: pokemonData.name,
            types: pokemonData.types,
            moves: pokemonData.moves,
            weight: pokemonData.weight,
        };
    }
}
