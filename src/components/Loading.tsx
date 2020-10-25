import React, { Component } from 'react';
import Pokeball from '../assets/pokeball64.png';
import './Loading.sass';

export default class Loading extends Component {
    render() {
        return (
            <div className="loading">
                <img src={Pokeball} className="rotate" />
                <div className="text">Loading...</div>
            </div>
        )
    }
}
