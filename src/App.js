import React, { useState } from 'react';
import './App.css';

const apiKey = "56cddf43375da36c8dd72d92edf9ff87";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const checkWeather = async () => {
    if (!city) {
      setError('Please enter a city name');
      setWeather(null);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data);
      setError('');
    } catch (error) {
      setWeather(null);
      setError("Invalid City Name");
    }
  };

  const handleSearch = () => {
    checkWeather();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      checkWeather();
    }
  };

  const weatherImages = {
    Clouds: "images/clouds.png",
    Clear: "images/clear.png",
    Rain: "images/rain.png",
    Drizzle: "images/drizzle.png",
    Mist: "images/mist.png",
    Snow: "images/snow.png",
    Thunderstorm: "images/thunderstorm.png"
  };

  return (
    <div className="card">
      <div className="search">
        <input 
          type="text" 
          placeholder="Enter city name" 
          spellCheck="false"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>
          <img src="images/search.png" alt="Search" />
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      {weather && (
        <div className="weather">
          <img src={weatherImages[weather.weather[0].main] || "images/default.png"} className="weather-icon" alt="Weather Icon" />
          <h1 className="temp">{Math.round(weather.main.temp)}°C</h1>
          <h2 className="city">{weather.name}</h2>
          <div className="details">
            <div className="col">
              <img src="images/humidity.png" alt="Humidity Icon" />
              <div>
                <p className="humidity">{weather.main.humidity}%</p>
                <p>HUMIDITY</p>
              </div>
            </div>
            <div className="col">
              <img src="images/wind.png" alt="Wind Speed Icon" />
              <div>
                <p className="wind">{weather.wind.speed} km/h</p>
                <p>WIND SPEED</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
