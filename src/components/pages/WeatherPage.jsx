import React, { useState, useEffect, useRef } from 'react';
import { appData } from '../../data/appData';
import Chart from 'chart.js/auto';

const WeatherPage = ({ showNotification, translations }) => {
    const [city, setCity] = useState('Delhi');
    const [activeChart, setActiveChart] = useState('temperature');
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const forecastData = appData.weather_14_days[city] || appData.weather_14_days['Bhubaneswar'] || [];
    const currentDay = forecastData[0] || { high: '28°C', low: '22°C', rain: '20%', humidity: '70%', advice: '—', icon: '⛅' };
    const currentTemp = currentDay.high;
    const currentHumidity = currentDay.humidity || '—';
    const currentRain = currentDay.rain || '—';
    const syntheticWind = city === 'Mumbai' ? '18 km/h' : city === 'Delhi' ? '12 km/h' : '15 km/h';
    const syntheticUV = city === 'Mumbai' ? 6 : city === 'Delhi' ? 8 : 7;

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            let chartConfig;
            switch (activeChart) {
                case 'rainfall':
                    chartConfig = {
                        type: 'bar',
                        data: {
                            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
                            datasets: [{
                                label: translations.weatherPage.charts.rainfallDataset,
                                data: [5, 15, 25, 8, 3, 2, 7],
                                backgroundColor: '#1FB8CD',
                            }]
                        },
                        options: { scales: { y: { beginAtZero: true } }, plugins: { title: { display: true, text: translations.weatherPage.charts.rainfallTitle } } }
                    };
                    break;
                case 'humidity':
                     chartConfig = {
                        type: 'line',
                        data: {
                            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
                            datasets: [{
                                label: translations.weatherPage.charts.humidityDataset,
                                data: [78, 82, 85, 79, 75, 72, 76],
                                borderColor: '#5D878F',
                                tension: 0.4,
                                fill: true,
                            }]
                        },
                        options: { plugins: { title: { display: true, text: translations.weatherPage.charts.humidityTrendTitle } } }
                    };
                    break;
                case 'temperature':
                default:
                    chartConfig = {
                        type: 'line',
                        data: {
                            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
                            datasets: [{
                                label: translations.weatherPage.charts.temperatureDataset,
                                data: [32, 30, 28, 31, 33, 34, 32],
                                borderColor: '#B4413C',
                                tension: 0.4,
                                fill: true,
                            }]
                        },
                        options: { plugins: { title: { display: true, text: translations.weatherPage.charts.temperatureTrendTitle } } }
                    };
                    break;
            }
             chartInstance.current = new Chart(chartRef.current.getContext('2d'), chartConfig);
        }
    }, [activeChart, city]);

    const handleCityChange = (e) => {
        setCity(e.target.value);
        showNotification(`🌤️ ${translations.weatherPage.title} — ${e.target.value}`, 'info');
    };

    return (
        <div className="page" id="weather-page">
            <div className="container">
                <h2 className="page-title">{translations.weatherPage.title}</h2>
                <div className="weather-dashboard">
                    <div className="weather-controls">
                        <select className="form-control" id="weatherCitySelect" value={city} onChange={handleCityChange}>
                            <option value="Delhi">Delhi</option>
                            <option value="Bhubaneswar">Bhubaneswar, Odisha</option>
                            <option value="Mumbai">Mumbai, Maharashtra</option>
                        </select>
                    </div>
                    <div className="weather-overview">
                        <div className="current-weather-detailed">
                            <div className="current-main">
                                <div className="weather-icon-large">{currentDay.icon || '⛅'}</div>
                                <div className="current-temp">{currentTemp}</div>
                                <div className="current-condition">Partly Cloudy</div>
                                <div className="current-location">{city}</div>
                            </div>
                            <div className="current-stats">
                                <div className="weather-stat-detailed"><span className="stat-icon">💧</span><span className="stat-label">{translations.weatherPage.labels.humidity}</span><span className="stat-value">{currentHumidity}</span></div>
                                <div className="weather-stat-detailed"><span className="stat-icon">💨</span><span className="stat-label">{translations.weatherPage.labels.windSpeed}</span><span className="stat-value">{syntheticWind}</span></div>
                                <div className="weather-stat-detailed"><span className="stat-icon">🌧️</span><span className="stat-label">{translations.weatherPage.labels.rainChance}</span><span className="stat-value">{currentRain}</span></div>
                                <div className="weather-stat-detailed"><span className="stat-icon">☀️</span><span className="stat-label">{translations.weatherPage.labels.uvIndex}</span><span className="stat-value">{syntheticUV}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="weather-forecast-extended">
                        <h3>{translations.weatherPage.forecastTitle}</h3>
                        <div className="forecast-container">
                            <div className="forecast-scroll" id="forecast14Day">
                                {forecastData.map((day, index) => {
                                    const date = new Date(day.date);
                                    const dayName = index === 0 ? translations.weatherPage.today : index === 1 ? translations.weatherPage.tomorrow : date.toLocaleDateString('en', { weekday: 'short' });
                                    return (
                                        <div key={index} className="forecast-day-card">
                                            <div className="forecast-date">{dayName}</div>
                                            <div className="forecast-icon-day">{day.icon}</div>
                                            <div className="forecast-temps-day"><span className="forecast-high">{day.high}</span><span className="forecast-low">{day.low}</span></div>
                                            <div className="forecast-rain">{day.rain} rain</div>
                                            <div className="forecast-advice">{day.advice}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="weather-charts">
                        <h3>{translations.weatherPage.trendsTitle}</h3>
                        <div className="chart-tabs">
                            <button className={`chart-tab-btn ${activeChart === 'temperature' ? 'active' : ''}`} onClick={() => setActiveChart('temperature')}>{translations.weatherPage.temperatureBtn}</button>
                            <button className={`chart-tab-btn ${activeChart === 'rainfall' ? 'active' : ''}`} onClick={() => setActiveChart('rainfall')}>{translations.weatherPage.rainfallBtn}</button>
                            <button className={`chart-tab-btn ${activeChart === 'humidity' ? 'active' : ''}`} onClick={() => setActiveChart('humidity')}>{translations.weatherPage.humidityBtn}</button>
                        </div>
                        <div className="chart-container" style={{ position: 'relative', height: '350px' }}>
                            <canvas ref={chartRef}></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherPage;