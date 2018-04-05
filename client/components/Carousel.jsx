import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
require('../helpers/Player');

export default class Carousel extends React.Component {
    constructor() {
        super();
        this.state = {
            ...getInitialData(),
            currentRotation: 0
        };
    }

    async componentDidMount() {
        this.setState({
            ...(await fetchInitialData()),
        });
    }
    rotateCarousel(e) {
        if (e === "previous") {this.state.currentRotation += 60;}
        if (e == "next") {this.state.currentRotation -= 60;}
        this.carousel.style.webkitTransform = "rotateY(" + this.state.currentRotation + "deg)";
        this.carousel.style.transform = "rotateY(" + this.state.currentRotation + "deg)";
    }
    render() {
        return (
            <div className="container">
                <div className="carousel" ref={(carousel) => { this.carousel = carousel; }}>
                    <div className="item a"><img className="cover upcover" src="static/images/covers/aceventura.jpg" alt="Album cover" /></div>
                    <div className="item b"><img className="cover upcover" src="static/images/covers/adhea.jpg" alt="Album cover" /></div>
                    <div className="item c"><img className="cover upcover" src="static/images/covers/astrix.jpg" alt="Album cover" /></div>
                    <div className="item d"><img className="cover upcover" src="static/images/covers/freetibet.jpg" alt="Album cover" /></div>
                    <div className="item e"><img className="cover upcover" src="static/images/covers/infected.jpg" alt="Album cover" /></div>
                    <div className="item f"><img className="cover upcover" src="static/images/covers/merkaba.jpg" alt="Album cover" /></div>
                </div>
            </div>
        )}
}


