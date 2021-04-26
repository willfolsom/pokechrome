export type Pokemon = {
    id: number,
    name: string,
    abilities: Ability[],
    sprites: {
        front_default: string,
    },
    types: PokemonType[],
    moves: Move[],
    weight: number,
    caught: boolean,
};

export type PokemonType = {
    slot: number,
    type: {
        name: string
    }
};

export type Ability = {
    ability: {
        name: string,
    },
    is_hidden: boolean
};

export type Move = {
    move: {
        name: string
    }
};

export type PokemonLocalStorage = {
    id: number,
    caught: boolean
}

export function createNewPokemon(): Pokemon {
    return {
        id: 0,
        name: "",
        abilities: [],
        sprites: {
            front_default: "",
        },
        types: [],
        moves: [],
        weight: 0,
        caught: false,
    }
}
