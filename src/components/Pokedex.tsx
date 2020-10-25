import React, { Component } from 'react'
import { Pokemon } from '../services/types/Pokemon';
import { PokeApiService } from '../services/PokeApi';
import { TallGrassService } from '../services/TallGrass';
import { getCurrentTab, setCurrentIcon } from '../services/Utils';
import { ChromeTab } from '../services/types/ChromeTab';
import Loading from './Loading'
import './Pokedex.sass';

export default class Pokedex extends Component {
    state = {
        pokemon: {} as Pokemon,
        searches: [] as Pokemon[]
    }

    componentDidMount() {
        chrome.runtime.onMessage.addListener((message) => {
            if (message.salutations) {
                this.setPokemonAndIcon(message.salutations);
            }
        });

        if (!this.state.pokemon.id){
            getCurrentTab((tab: ChromeTab) => {
                this.setPokemonAndIcon(tab.url);
            });
        }
    }

    handleSearch(input: string) {
        input = input.toLowerCase();
        PokeApiService.getPokemonByName(input).then(p => {
            if (p) {
                // Take last two then add in the new result
                var newSearches = this.state.searches.slice(Math.max(this.state.searches.length - 2, 0));
                this.setState({searches: [...newSearches, p]});
                this.setState({pokemon: p});
            }
        });
    }

    reDisplay(p: Pokemon) {
        this.setState({pokemon: p});
    }

    capitalize(s: string) {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    setPokemonAndIcon(url: string) {
        var encountered = TallGrassService.stepIntoGrass(url);

        PokeApiService.getPokemonById(encountered)
            .then(p => { this.setState({pokemon: p}); setCurrentIcon(p.sprites?.front_default);});
    }

    render() {
        const { pokemon, searches } = this.state;

        return (
            <div>
                <div className="navbar">
                    <input type="text" className="input" placeholder="Search" onChange={event => this.handleSearch(event.target.value)} />
                </div>
                { pokemon?.name
                ? <div className="card">
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
                            {pokemon.abilities?.slice(0,5).map(ability => (
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
                : <Loading/>
                }
                { searches.length > 0 &&
                    <div className="searches">
                        <div className="last3">Last {searches.length} Searches:</div>
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
