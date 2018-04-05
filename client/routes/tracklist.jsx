import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
import isMp3 from 'is-mp3';
export default class Chakras extends React.Component {
    constructor() {
        super();

        this.state = {
            ...getInitialData(),
            counter: 0,
        };
    }

    async componentDidMount() {
        this.setState({
            ...(await fetchInitialData()),
        });
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3900/getfile');
        xhr.responseType = 'arraybuffer';

        xhr.onload = function () {

            console.log(isMp3(new Uint8Array(this.response)))
            //=> true
        };

        xhr.send();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="app">
                <img className='logo' src='./static/images/logo.png'/>
                <h1>GRZYBNIA</h1>
            </div>
        )
    }
}
