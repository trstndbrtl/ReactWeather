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
        // Get Sunrise
        var secMorning = weatherI.sys.sunrise;
        var dateMorning = new Date(secMorning * 1000);
        var timestrSunrise = dateMorning.toLocaleTimeString();
        // Get Sunset
        var secNight = weatherI.sys.sunset;
        var dateNight = new Date(secNight * 1000);
        var timestrSunset = dateNight.toLocaleTimeString();
        // get descritption
        const description = weatherI.weather[0].description;
        // get icon
        const icon = weatherI.weather[0].icon;
        // Get name
        const name = weatherI.name;
        
        return (
            <div>
                <div className="size">
                    <div>
                        <h1>{ name }</h1>
                        <img src={`//openweathermap.org/img/w/${ icon }.png`} />
                        <div><em>{ description }</em></div>
                        <div>Lever du soleil : { timestrSunrise }</div>
                        <div>Coucher du soleil : { timestrSunset }</div>
                        <br/>
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