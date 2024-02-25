import React from 'react';
import { Link } from 'react-router-dom';
import CityWeatherCard from './CityWeatherCard';
import '../sass/HomePage.scss'

const cities = ['Moscow', 'St Petersburg', 'Rostov-on-Don', 'Vladivostok', 'Krasnodar', 'Yekaterinburg'];

const HomePage: React.FC = () => {
	return (
			<div>
				<h1>Weather App</h1>
			<div className='weather'>
				{cities.map((city) => (
					<CityWeatherCard key={city} city={city} />
				))}
			</div>
		</div>
	);
};

export default HomePage;