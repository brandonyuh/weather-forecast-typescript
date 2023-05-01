import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [hourlyData, setHourlyData] = useState<any[]>([]);
  const [dailyData, setDailyData] = useState<any[]>([]);
  useEffect(() => {
    axios.get(`https://api.weatherbit.io/v2.0/forecast/hourly?key=${process.env.REACT_APP_WEATHERBIT_KEY}&city=Vancouver&country=CA`).then((response) => {
      setHourlyData(response.data.data);
      console.log(response.data.data);
    });
    axios
      .get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHERBIT_KEY}&city=Vancouver&country=CA`)
      .then((response) => {
        setDailyData(response.data.data);
      })
    return () => {};
  }, []);

  const getWeekDay = (date: Date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date(date).getDay()];
  };

  const celsiusToFahrenheit = (celsius: number) => {
    return Math.round((celsius * 9) / 5 + 32);
  };

  return (
    <div className="App">
      <h1>Vancouver</h1>
      <div className="container">
        <div>
          <h2>Hourly</h2>
          <ul>
            {hourlyData.map((hour) => {
              return (
                <li className="weather__box">
                  <p>{new Date(hour.timestamp_local).toLocaleTimeString()}</p>
                  <p>
                    {Math.round(hour.temp)}°C | {celsiusToFahrenheit(hour.temp)}°F
                  </p>
                  <p>Pop: {hour.pop} %</p>
                  <p>Precipitation: {hour.precip} mm</p>
                  <p>
                    <img src={`https://www.weatherbit.io/static/img/icons/${hour.weather.icon}.png`} alt="" /> {hour.weather.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h2>Daily</h2>
          <ul>
            {dailyData.map((day) => {
              return (
                <li className="weather__box">
                  <p>
                    {getWeekDay(day.datetime)} {new Date(day.datetime).toLocaleDateString()}
                  </p>
                  <p>
                    {Math.round(day.high_temp)}°C | {celsiusToFahrenheit(day.high_temp)} °F
                  </p>
                  <p>
                    {Math.round(day.low_temp)}°C | {celsiusToFahrenheit(day.low_temp)}°F
                  </p>

                  <p>Pop: {day.pop} %</p>
                  <p>Precipitation: {day.precip} mm</p>
                  <p>
                    <img src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`} alt="" /> {day.weather.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
