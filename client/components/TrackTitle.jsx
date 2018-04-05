import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
require('../helpers/Player');

export default class Controls extends React.Component {
    constructor() {
        super();
        this.state = {
            ...getInitialData(),
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
        return ( <h4 id='#title' className="title">Evil Pimp - Lights On Da Bucket</h4>);
    }
}


