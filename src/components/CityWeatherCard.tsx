import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../sass/CityWeatherCard.scss';

interface CityWeatherCardProps {
	city: string;
}

interface WeatherData {
	temperature: number;
	description: string;
	windSpeed: number;
}

const CityWeatherCard: React.FC<CityWeatherCardProps> = ({ city }) => {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

	useEffect(() => {
		const fetchWeatherData = async () => {
			try {
				const response = await axios.get(
					`https://api.open-meteo.com/v1/forecast?latitude=55.7522&longitude=37.6156&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,wind_speed_10m`
				);

				const currentWeather = response.data.hourly.temperature_2m[0];
				setWeatherData({
					temperature: currentWeather.value,
					description: response.data.current.weather_description,
					windSpeed: currentWeather.windspeed,
				});
			} catch (error) {
				console.error(`Error fetching weather data for ${city}:`, error);
			}
		};

		fetchWeatherData();
	}, [city]);

	return (
		<div className="card">
			<h2>{city}</h2>
			{weatherData ? (
				<>
					<p>Температура: {weatherData.temperature}°C</p>
					<p>Погода: {weatherData.description}</p>
					<p>Скорость ветра: {weatherData.windSpeed} м/с</p>
				</>
			) : (
				<p>Загрузка данных...</p>
			)}
			<Link to={`/weather/${encodeURIComponent(city)}`}>Посмотреть прогноз</Link>
		</div>
	);
};

export default CityWeatherCard;
