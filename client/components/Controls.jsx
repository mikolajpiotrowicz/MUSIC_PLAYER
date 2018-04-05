import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
import Player from '../helpers/Player';
import ButtonsPanel from '../components/ButtonsPanel'
import Carousel from '../components/Carousel';
import Timeline from '../components/TImeline';
import TrackTitle from '../components/TrackTitle';
import Playlist from '../components/Playlist';
import isNode from 'detect-node';
export default class Controls extends React.Component {
    constructor() {
        super();
        this.state = {
            ...getInitialData(),
            sound: undefined,
            timeline: React.createRef()
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.toggle = this.toggle.bind(this);
        this.setVolume = this.setVolume.bind(this);
    }

    async componentDidMount() {
        this.setState({
            ...(await fetchInitialData()),
            sound: (isNode) ? undefined : document.createElement('audio')
        });
        if(this.state.sound){
            this.state.sound.src = 'http://localhost:3900/download?id=evil.mp3#t=4.5';
            this.setSoundEvents();
        }

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    setSoundEvents(){
        this.state.sound.addEventListener('timeupdate',() => {
            this.state.timeline.current.setDot();
            this.setState({});
        });
        this.state.sound.addEventListener('canplay',() => {
            this.toggle();
        });
        this.state.sound.addEventListener('loadedmetadata',() => {
            this.state.sound.currentTime = 77;
        });
    }
    rotateCarousel(direction){
        this.carousel.rotateCarousel(direction);
    }
    setVolume(volume){
        this.state.sound.volume = volume;
    }
    toggle(){
        if(this.state.sound.paused) this.state.sound.play();
        else this.state.sound.pause();
        this.setState({});

    }
    next(){
        this.rotateCarousel('next')
    }
    previous(){
        this.rotateCarousel('previous')
    }
    render() {
        return (
            <div className="controls">
                <div className='bg1'></div>
                <div className='bg2'> </div>
                <Playlist/>
                <Carousel ref={(carousel) => { this.carousel = carousel; }}/>
                <TrackTitle/>
                <ButtonsPanel controller={this} ref={(input) => { this.buttonsPanel = input; }}/>
                <Timeline sound={this.state.sound} ref={this.state.timeline}/>
            </div>
            )}
}


