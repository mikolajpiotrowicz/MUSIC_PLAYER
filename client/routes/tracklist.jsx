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
