import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
import {Utils} from './../helpers/Utils'

export default class TImeline extends React.Component {
    constructor() {
        super();
        this.state = {
            dot: React.createRef(),
            ...getInitialData(),
        };
    }

    async componentDidMount() {
        this.setState({
            ...(await fetchInitialData()),
        });
    }

    setDot(){
        this.state.dot.current.style.left = `${parseInt(this.props.sound.currentTime)/parseInt(this.props.sound.duration) * 750}px`
    }
    render() {
        const currentTime = (this.props.sound && this.props.sound.currentTime) ? Utils.convertSecToDisplayTime(this.props.sound.currentTime) : '0:00',
            duration = (this.props.sound && this.props.sound.duration) ? Utils.convertSecToDisplayTime(this.props.sound.duration): '0:00';
        return (
                <div className="timeControlWrapper">
                    <div className="time__progress-bar--background"></div>
                    <div className="time__progress-bar--elapsed"></div>
                    <div ref={this.state.dot} className="time__progress-dot"></div>
                    <span className="time time--elapsed">{currentTime}</span>
                    <span className="time time--tracklength">{duration}</span>
                </div>

        )}
}


