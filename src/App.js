import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './App.css'
import Weather from './Weather';
import Movie from './Movies'

class App extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				city: 'Seattle',
				cityData: [],
				cityLon: '12',
				cityLat: '10',
				displayMap: ``,
				error: false,
				errorMessages: '',
				weatherData: [],
				movieData: [],
				showWeather: false,
				showMovie: false,
			}
		}
	
	// CITY DATA HANDLERS

	handleInput = (e) => {
		e.preventDefault();
		this.setState({
			city: e.target.value
		})
	}

	getCityData = async (e) => {
		e.preventDefault();
		try {
				let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
				
				let cityData = await axios.get(url);
				console.log(cityData);
				
				let weatherURL = `${process.env.REACT_APP_SERVER_URL}/weather?lat=${cityData.data[0].lat}&lon=${cityData.data[0].lon}`;
				console.log(weatherURL);
				
				let weatherData = await axios.get(weatherURL);
				console.log(weatherData);


				let movieUrl = `${process.env.REACT_APP_SERVER_URL}/movies?city=${this.state.city}`;

				console.log(movieUrl);

				let movieData = await axios.get(movieUrl);
				console.log(movieData)
				
				this.setState({
					cityData: cityData.data[0],
					cityLat: cityData.data[0].lat,
					cityLon: cityData.data[0].lon,
					weatherData: weatherData.data,
					movieData: movieData.data,
					showWeather: true,
					showMovie: true,
				})
	} 
	
	catch(error){		console.log(error);
		console.log(error.message);
		this.setState({
			error: true,
			errorMessage: `${error.message}`
		})
	};
	}
render() {

	return (
		<span>
		<header>
		<Form onSubmit={this.getCityData}>
			<Form.Label className='label'> Pick a city!
				<input className='city' type="text" onInput={this.handleInput} />
			</Form.Label>
			<Button className='explore' type='submit'>Explore!</Button>
		</Form>
		</header>

		<main>
		<Card style={{ width: '18rem' }}>
			<Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityLat},${this.state.cityLon}&zoom=14&size=400x400`} />
			<Card.Body>
				<Card.Title>{this.state.city}</Card.Title>
				<span className='lonlat'>
				<Card.Text className='text'>
					Longitude: {this.state.cityLon}
					Latitude: {this.state.cityLat}
				</Card.Text>
				</span>
			</Card.Body>
		</Card>
		{this.state.showWeather &&<Weather weatherData={this.state.weatherData} />}
		{this.state.showMovie &&<Movie movieData={this.state.movieData} />}
		</main>
		</span>
	);
	}
}

export default App;
