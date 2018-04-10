import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
import {Utils} from './../helpers/Utils'
import Player from '../helpers/Player';
import Draggable from 'react-draggable';

export default class Timeline extends React.Component {
    constructor() {
        super();
        this.state = {
            ...getInitialData(),
            dragTime: '0:00',
            dragging: false
        };
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.seek = this.seek.bind(this);
    }

    async componentDidMount() {
        this.setState({
            ...(await fetchInitialData()),
        });
    }

    handleStart(e, ui) {
        this.setState({
            dragging: true,
            lastTime: Player.sound.currentTime
        });
    }

    handleDrag(e, ui) {
        const current = ui.x;
        this.setState({currentDrag: current})
    }

    handleStop(e, ui) {
        const current = ui.x,
            barWidth = 730,
            duration = Player.sound.duration;
        Player.seek((current / barWidth) * duration.toFixed(2));
        this.setState({dragging: false});
    }

    seek(e) {
        const rect = e.target.getBoundingClientRect(),
            current = e.clientX - rect.left,
            barWidth = 730,
            duration = Player.sound.duration;
        if (current > 5) Player.seek(((current - 10) / barWidth) * duration.toFixed(2));
    }

    render() {
        let position, currentTime, duration, elapsedWidth;


        if (Player.sound && !this.state.dragging) {
            position = {x: parseInt(Player.sound.currentTime) / parseInt(Player.sound.duration) * 730, y: 0};
            currentTime = Utils.convertSecToDisplayTime(Player.sound.currentTime);
            duration = Utils.convertSecToDisplayTime(Player.sound.duration);
            elapsedWidth = `${(parseInt(Player.sound.currentTime) / parseInt(Player.sound.duration) * 730) + 10}px`
        }
        else {
            position = {
                x: this.state.lastTime ? parseInt(this.state.lastTime) / parseInt(Player.sound.duration) * 730 : 0,
                y: 0
            };
            elapsedWidth = this.state.lastTime ? `${parseInt(this.state.lastTime) / parseInt(Player.sound.duration) * 730}px` : `0px`,
            currentTime = Player.sound ? Utils.convertSecToDisplayTime(Player.sound.currentTime) : '0:00';
            duration = Player.sound ? Utils.convertSecToDisplayTime(Player.sound.duration) : '0:00';
        }

        if (this.state.dragging) {
            elapsedWidth = `${this.state.currentDrag + 10}px`;
            currentTime = Utils.convertSecToDisplayTime((this.state.currentDrag / 730) * Player.sound.duration.toFixed(2));
        }

        return (
            <div className="timeControlWrapper">
                <div className="time__progress-bar--background" onClick={this.seek}/>
                <div style={{width: elapsedWidth}} className="time__progress-bar--elapsed"/>
                <span className="time time--elapsed">{currentTime}</span>
                <span className="time time--tracklength">{duration}</span>
                <Draggable
                    axis="x"
                    handle=".handle"
                    defaultPosition={{x: 0, y: 0}}
                    bounds={{top: 0, left: -0, right: 750 - 20, bottom: 0}}
                    position={position}
                    onStart={this.handleStart}
                    onDrag={this.handleDrag}
                    onStop={this.handleStop}>
                    <div>
                        <div className="handle time__progress-dot"/>
                    </div>
                </Draggable>
            </div>
        )
    }
}


