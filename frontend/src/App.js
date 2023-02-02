import './App.css';
import React, { Component, useEffect, useState } from "react";
import axios from 'axios';
import CITIES from './json-File/cities.json'; // retrieve json file



function App() {

  //Task 02 calling the openweathermap api to get the current weather data

  const [data, setData] = useState({})
  const [cityid, setcityId] = useState('')

  //Task 01 extracting json file ans assign cityCodes to an array
  const {
    List = [],
    CityCodes = CITIES.List.map(List => List.CityCode),
  } = data;

  console.log(CityCodes);

  const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityid}&units=metric&appid=${API_KEY}`
  const searchCityCode = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      });
      setcityId('')
    }
  }



  return (

    <div className="app">
      <div className="search">
        <input
          value={cityid}
          onChange={event => setcityId(event.target.value)}
          onKeyPress={searchCityCode}
          placeholder='Search'
          type="text" />
      </div>

      <div className="weather">

        <div className="top">
          <div>
            <p className="city">{data.name}</p>

          </div>
          <img
            alt="weather"
            className="weather-icon"
            src={`icons/${data.weather[0].icon}.png`}
          />
        </div>
        <div className="bottom">
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <p className="temperature"></p>
          <div className="details">
            <div className="parameter-row">
              <span className="parameter-label"> {data.weather ? <p>{data.weather[0].main}</p> : null}</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Last update</span>
              <span className="parameter-value">{data.dt}
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Wind</span>
              <span className="parameter-value">{data.wind ? <p className='bold'>{data.wind.speed}m/s</p> : null}</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Humidity</span>
              <span className="parameter-value">{data.main ? <p className='bold'>{data.main.humidity}%</p> : null}</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">ID</span>
              <span className="parameter-value">{data.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
