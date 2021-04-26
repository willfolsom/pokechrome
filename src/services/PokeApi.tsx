import { Pokemon, PokemonLocalStorage } from './types/Pokemon';
import { storage } from '@extend-chrome/storage'

const pokeapiUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
const getOptions: object = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};
const pokechromePrefix: string = "pkc-";

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

    storePokemonByIdLocal(id: number, caught: boolean) {
        const pKey: string = pokechromePrefix + id.toString();

        const pokemonLocalStorage: PokemonLocalStorage = {
            id: id,
            caught: caught
        }

        const stringifiedPLS = JSON.stringify(pokemonLocalStorage);
        storage.sync.set({ pKey: stringifiedPLS });
    };

    getPokemonByIdLocal(id: number): Pokemon | undefined {
        const pKey: string = pokechromePrefix + id.toString();

        storage.sync.get({ pKey }).then(({ pKey }) => {
            const parsedP: PokemonLocalStorage = JSON.parse(pKey);
            if (parsedP != undefined) {
                return parsedP;
            }
        });

        return undefined;
    };

    formatPokemon(pokemonData: any): Pokemon {
        return {
            abilities: pokemonData.abilities.slice(0,5),
            id: pokemonData.id,
            sprites: {
                front_default: pokemonData.sprites.front_default
            },
            name: pokemonData.name,
            types: pokemonData.types,
            moves: pokemonData.moves.slice(0,5),
            weight: pokemonData.weight,
            caught: false,
        };
    }
}
