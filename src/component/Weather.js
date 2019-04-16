import React, { Component } from "react";
import { Key } from '../Utils/Key'

class Weather extends Component {


    constructor(props) {
        super(props);
        this.state = {
            weatherInfo: null
        };

    }

    componentDidMount() {
        this.handleClick();
    }

    handleClick() {

        fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=baf7b1242f239d266c917fa057321bfb")
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
                        {weatherI.base }
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