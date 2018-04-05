import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
import  Controls from './../components/Controls';

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
                <Controls/>
            </div>
        )
    }
}
