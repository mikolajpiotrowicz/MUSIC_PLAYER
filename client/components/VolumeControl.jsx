import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'
import Player from '../helpers/Player';

export default class VolumeControl extends React.Component {
    constructor() {
        super();
        this.state = {
            ...getInitialData(),
        };
    }

    async componentDidMount() {
        this.setState({
            ...(await fetchInitialData()),
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div id="volume" className="volumeWrapper">
                <FontAwesomeIcon icon='volume-up'/>
                <input onChange={(e) => {Player.setVolume(e.target.value/100)}} className="volumeControl" id="volumeControl" defaultValue='50' type="range" />
            </div>
        )}
}


