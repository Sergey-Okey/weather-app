import React, { useState, useEffect, ChangeEvent } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import '../sass/AutocompleteInput.scss'

interface AutocompleteInputProps {
	onSelectCity: (city: string) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ onSelectCity }) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [suggestedCities, setSuggestedCities] = useState<string[]>([]);

	useEffect(() => {
		const fetchCities = async () => {
			try {
				const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${inputValue}`);
				const data = await response.json();
				const cities = data.map((item: { name: string }) => item.name);
				setSuggestedCities(cities);
			} catch (error) {
				console.error('Error fetching suggested cities:', error);
			}
		};

		if (inputValue.length > 2) {
			fetchCities();
		} else {
			setSuggestedCities([]);
		}
	}, [inputValue]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleCitySelect = (city: string) => {
		setInputValue(city);
		setSuggestedCities([]);
		onSelectCity(city);
	};

	return (
		<Form>
			<Form.Control type="text" placeholder="Введите город" value={inputValue} onChange={handleInputChange} />
			{suggestedCities.length > 0 && (
				<ListGroup>
					{suggestedCities.map((city) => (
						<ListGroup.Item key={city} action onClick={() => handleCitySelect(city)}>
							{city}
						</ListGroup.Item>
					))}
				</ListGroup>
			)}
		</Form>
	);
};

export default AutocompleteInput;