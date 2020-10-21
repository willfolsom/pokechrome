import React, { Component } from 'react'
import { Pokemon } from '../services/types/Pokemon';
import { PokeApiService } from '../services/PokeApi';
import { TallGrassService } from '../services/TallGrass';
import { getCurrentTab, setCurrentIcon } from '../services/Utils';
import { ChromeTab } from '../services/types/ChromeTab';
import './Pokedex.sass';

export default class Pokedex extends Component {
    state = {
        pokemon: {} as Pokemon,
        searches: [] as Pokemon[]
    }

    componentDidMount() {
        var encountered: number;

        if (!this.state.pokemon.id){
            getCurrentTab((tab: ChromeTab) => {
                encountered = TallGrassService.stepIntoGrass(tab.url);

                PokeApiService.getPokemonById(encountered)
                    .then(p => { this.setState({pokemon: p}); setCurrentIcon(p.sprites?.front_default);});
            });
        }
    }

    handleSearch(input: string) {
        input = input.toLowerCase();
        PokeApiService.getPokemonByName(input).then(p => {
            if (p) {
                this.setState({searches: [...this.state.searches, p]})
                this.setState({pokemon: p})
            }
        });
    }

    reDisplay(p: Pokemon) {
        this.setState({pokemon: p})
    }

    capitalize(s: string) {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    render() {
        const { pokemon, searches } = this.state;

        return (
            <div>
                <div className="navbar">
                    <input type="text" className="input" placeholder="Search" onChange={event => this.handleSearch(event.target.value)} />
                </div>
                <div className="card">
                    <div className="name">
                        {this.capitalize(pokemon.name)}, No. {pokemon.id}
                    </div>
                    { pokemon?.sprites?.front_default &&
                        <img src={pokemon.sprites.front_default}></img>
                    }
                    { pokemon?.types &&
                        <div className="types">
                            {pokemon.types?.map(type => (
                            <ul>
                                <li className={type.type.name}>{type.type.name}</li>
                            </ul>
                        ))}
                        </div>
                    }
                    { pokemon?.abilities &&
                        <div className="abilities">
                            <div>Abilities:</div>
                            {pokemon.abilities?.slice(0,3).map(ability => (
                            <li>{ability.ability.name}</li>
                        ))}
                        </div>
                    }
                    { pokemon?.moves &&
                        <div className="moves">
                            <div>Moves:</div>
                            {pokemon.moves?.slice(0,5).map(move => (
                            <li>{move.move.name}</li>
                        ))}
                        </div>
                    }
                </div>
                { searches.length > 0 &&
                    <div className="searches">
                        <div className="last3">Last 3 Searches:</div>
                        {searches.slice(Math.max(searches.length - 3, 0)).map(search => (
                            <ul>
                                <li><a onClick={(): void => this.reDisplay(search)}>{this.capitalize(search.name)}</a></li>
                            </ul>
                        ))}
                    </div>
                }
            </div>
        )
    }
}
