import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
import Controls from './../components/Controls';
import Playlist from './../components/Playlist';

export default class Chakras extends React.Component {
    constructor() {
        super();

        this.state = {
            ...getInitialData(),
            style: {
                background: 'red'
            },
            counter: 0,
        };
        this.setBackground = this.setBackground.bind(this);
    }

    async componentDidMount() {
        this.setState({
            ...(await fetchInitialData()),
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    setBackground(color1, color2){
        const colors = [`rgb(${color1._rgb[0]},${color1._rgb[1]},${color1._rgb[2]})`,`rgb(${color2._rgb[0]},${color2._rgb[1]},${color2._rgb[2]})`];
        const divStyle = {
            background: `-webkit-linear-gradient(left, ${colors[1]}, ${colors[0]}, ${colors[1 ]})`
        };
        this.setState({
            style: divStyle
        })
    }
    render() {
        return (
            <div style={this.state.style} className="app">
                <img className='logo' src='./static/images/logo.png'/>
                <div ref={(bg1) => { this.bg1 = bg1; }} className='bg1'> </div>
                <Playlist/>
                <Controls setBackground={this.setBackground} bg1={this.bg1} bg2={this.bg2}/>
            </div>
        )
    }
}
