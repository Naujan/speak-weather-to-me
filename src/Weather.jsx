import React from "react";
import dotenv from "dotenv";
dotenv.config();
const fetch = require("node-fetch");

const appId = process.env.REACT_APP_APPID;
const mapURI = "http://api.openweathermap.org/data/2.5";

const getDataFromApi = async ([lat, lon]) => {
  try {
    const response = await fetch(
      `${mapURI}/weather?lat=${lat}&lon=${lon}&appid=${appId}&`
    );
    return response.json();
  } catch (error) {
    console.error(error);
    return {};
  }
};

const getPosition = options => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

const getLocationData = async () => {
  if ("geolocation" in window.navigator) {
    return getPosition().then(position => {
      const location = [position.coords.latitude, position.coords.longitude];
      console.log(`At getLocation: ${location}`);
      return location;
    });
  } else {
    console.log("No location :(");
  }
  return [0, 0];
};

export class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null
    };
  }

  toCelsius(t) {
    return Math.round(parseInt(t, 10) - 273.15);
  }

  async componentWillMount() {
    const location = await getLocationData();
    console.log(`At componentWillMount: ${location}`);
    const weather = await getDataFromApi(location);
    console.log(weather);
    this.setState({
      weather
    });
  }

  saveLocation = e => {
    e.preventDefault();
    localStorage.setItem("savedLocation", this.state.location);
    console.log("location saved");
  };

  getSavedLocation = async () => {
    this.state.location = localStorage.getItem("savedLocation");
    console.log("Now showing saved location's weather!");
  };

  render() {
    const { weather } = this.state;
    return (
      <div className="weather">
        {weather && (
          <div>
            <p>
              Your location: {weather.name}
              <br />
              Temperature: {this.toCelsius(weather.main.temp)} Celsius
            </p>
            <button onClick={this.saveLocation}>Save location</button> <br />
            <button onClick={this.getSavedLocation}>View saved location</button>
          </div>
        )}
      </div>
    );
  }
}
