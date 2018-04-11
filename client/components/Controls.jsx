import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
import ButtonsPanel from '../components/ButtonsPanel'
import Carousel from '../components/Carousel';
import Timeline from '../components/TImeline';
import TrackTitle from '../components/TrackTitle';
import Player from '../helpers/Player';
import Playlist from '../helpers/Playlist'

export default class Controls extends React.Component {
    constructor() {
        super();
        this.state = {
            ...getInitialData(),
            timeline: undefined
        };
        this.reRender = this.reRender.bind(this);
        Player.oncanplayCb = this.reRender;
        Player.timeupdateCb = this.reRender;
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.toggle = this.toggle.bind(this);
        this.setVolume = this.setVolume.bind(this);
        this.setBG = this.setBG.bind(this);
        this.playlist = Playlist;
    }

    async componentDidMount() {
        this.setState({
            ...(await fetchInitialData()),
        });
    }

    setVolume(volume) {
        Player.setVolume = volume;
    }

    toggle() {
        if (!Player.playing) Player.play();
        else Player.pause();
        this.setState({});
    }

    next() {
        Playlist.next();
    }

    previous() {
        Playlist.previous();
    }

    setBG(palette) {
        this.setState({palette});
    }

    reRender() {
        this.setState({});
    }

    render() {
        return (
            <div className="controls">
                <Carousel setBackground={this.props.setBackground} ref={(carousel) => {
                    this.carousel = carousel;
                }}/>
                <TrackTitle/>
                <ButtonsPanel controller={this} ref={(input) => {
                    this.buttonsPanel = input;
                }}/>
                <Timeline player={this.state.player}/>
            </div>
        )
    }
}


