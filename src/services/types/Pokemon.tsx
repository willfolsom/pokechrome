export type Pokemon = {
    id: number,
    name: string,
    abilities: Ability[],
    sprites: {
        front_default: string,
    },
    types: PokemonType[],
    moves: Move[],
    weight: number
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
