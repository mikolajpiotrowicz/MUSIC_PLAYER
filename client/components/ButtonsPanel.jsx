import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
import VolumeControl from "./VolumeControl";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Player from '../helpers/Player';

import {faCheckSquare, faCoffee} from '@fortawesome/fontawesome-free-solid'

export default class ButtonsPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            ...getInitialData(),
        };
    }

    render() {
        return (
            <div className="buttons">
                <FontAwesomeIcon icon='redo-alt'/>
                <a onClick={this.props.controller.previous}>
                    <FontAwesomeIcon icon='step-backward'/>
                </a>
                <a onClick={this.props.controller.toggle}>
                    <FontAwesomeIcon icon={(!Player.playing) ? 'play' : 'pause'}/>
                </a>
                <a onClick={this.props.controller.next}><
                    FontAwesomeIcon icon='step-forward'/>
                </a>
                <VolumeControl setVolume={this.props.controller.setVolume}/>
            </div>
        )
    }
}


