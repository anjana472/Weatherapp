// src/Weather.js
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('kozhikode');

    const fetchWeatherData = async (city) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: city,
                    units: 'imperial',
                    appid: '0cf3d05c6cb443424f42856d18e090b3'
                }
            });
            setWeatherData(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        fetchWeatherData(city);
    };

    return (
        <div>
            <h1>Weather App</h1>
            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Enter city name" 
                />
                <button type="submit">Search</button>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {weatherData && (
                <div>
                    <h2>Weather in {weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp} °F</p>
                    <p>Condition: {weatherData.weather[0].description}</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed} mph</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
