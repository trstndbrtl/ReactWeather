import React, { Component } from 'react';
import { Key } from '../Utils/Key';

class Weather extends Component {


    constructor(props) {
        super(props);
        this.state = {
            weatherInfo: null
        };

    }

    componentDidMount() {
        console.log(Key);
        this.handleClick();
    }

    handleClick() {

        var City = ['London', 'Paris,FR', 'Lisbon,P', 'Marseille,FR', 'Lyon,FR'][Math.floor(Math.random() * 5)];

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City},uk&appid=${Key}`)
            .then(response => response.json())
            .then(data => console.log(data) || this.setState({ weatherInfo: data }));
    }

    render() {


        const weatherI = this.state.weatherInfo;

        if (!weatherI) {
            return <div>Wait a moment</div>;
        }

        return (
            <div>
                <div className="size">
                    <div>
                        {weatherI.name }
                        {weatherI.wind.deg }
                        <button className="random-quote" onClick={() => this.handleClick()}>
                            random
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Weather;