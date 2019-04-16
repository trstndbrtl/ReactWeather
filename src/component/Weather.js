import React, { Component } from 'react';
import { Key } from '../Utils/Key';

class Weather extends Component {


    constructor(props) {
        super(props);
        this.state = {
            weatherInfo: null
        };

    }

    // Set default value
    componentDidMount() {
        this.handleClick();
    }

    // Request Api
    handleClick() {
        // Store random city
        var City = ['London', 'Paris,FR', 'Lisbon,P', 'Marseille,FR', 'Lyon,FR'][Math.floor(Math.random() * 5)];
        // Fetch info
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City},uk&appid=${Key}`)
            .then(response => response.json())
            .then(data => console.log(data) || this.setState({ weatherInfo: data }));
    }

    // Get sunrise with second
    getSunrise(seconde) {
        let secMorning = seconde;
        let dateMorning = new Date(secMorning * 1000);
        return dateMorning.toLocaleTimeString();
    }

    // get Sunset with second
    getSunset(seconde) {
        let secNight = seconde;
        let dateNight = new Date(secNight * 1000);
        return dateNight.toLocaleTimeString();
    }

    // get the date of the day
    getCurrentDate() {
        let currentDate = new Date();
        return currentDate.toLocaleString('fr-FR', { timeZone: 'Europe/paris' });
    }

    // get excuses with description
    getExcuse(cloud) {
        const excuses = {
            'broken clouds': 'Hey, je peux pas venir j\'ai poney',
            'overcast clouds': 'Hey, je peux pas venir j\'ai pixine',
            'clear sky' : 'Je peux pas j\'ai sky',
            'haze' : 'Je peux pas j\'ai New York',
            'scattered clouds' : 'Je peux pas j\'ai Ping Pong',
            'few clouds' : 'Je peux pas j\'ai ascenseur',
        };

        return excuses[cloud];
    }

    // get icon
    getIcon(icon) {
        return `//openweathermap.org/img/w/${ icon }.png`;
    }

    render() {

        const weatherI = this.state.weatherInfo;
        // check if state weather info existe
        if (!weatherI) {
            return <div>Wait a moment</div>;
        }
        // Get date and hours now
        const dateDay = this.getCurrentDate();
        // Get Sunrise
        var timestrSunrise = this.getSunrise(weatherI.sys.sunrise);
        // Get Sunset
        var timestrSunset = this.getSunset(weatherI.sys.sunset);
        // get descritption
        const description = weatherI.weather[0].description;
        // get icon
        const icon = weatherI.weather[0].icon;
        // Get name
        const name = weatherI.name;
        // Some excuses
        const excuses = this.getExcuse(description);

        return (
            <div>
                <div className="size">
                    <div>
                        <h1>{ name }</h1>
                        <h2>{ excuses }</h2>
                        <div>{ dateDay }</div>
                        <img alt={name} src={this.getIcon(icon)} />
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