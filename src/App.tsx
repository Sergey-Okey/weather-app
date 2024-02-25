import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ForecastPage from './components/ForecastPage';

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/weather/:city" element={<ForecastPage />} />
			</Routes>
		</Router>
	);
};

export default App;
