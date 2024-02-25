import React from 'react';
import { Link } from 'react-router-dom';
import '../sass/ForecastPage.scss'

const ForecastPage: React.FC = () => {
	return (
		<div>
			<h1>7 дневный прогноз погоды</h1>
			<Link className='back' to="/">Назад</Link>
		</div>
	);
};

export default ForecastPage;