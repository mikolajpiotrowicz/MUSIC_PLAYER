import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
import Playlist from '../helpers/Playlist';

export default class Controls extends React.Component {
    constructor() {
        super();
        this.state = {
            ...getInitialData(),
            title: " ",
            artist: " "
        };
        this.setTitle = this.setTitle.bind(this);
        Playlist.setTitleCb = this.setTitle;

    }

    setTitle(track){
        this.setState({
            title: track.trackName.replace('.mp3', '').substr(0, ),
            artist: track.albumName.substr(0, track.albumName.lastIndexOf(" -"))
        });
    }

    render() {
        return (
            <h4 id='#title' className="title">
                <span className='artist'>{this.state.artist}</span><br/>
                <span className={this.state.title.length > 40 ? 'marquee' : ''}>
                    <p>{this.state.title}</p>
                </span>
            </h4>);
    }
}


