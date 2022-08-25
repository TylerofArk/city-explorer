import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './App.css'
import Weather from './Weather.js';

class App extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				city: '',
				cityData: [],
				cityLon: '',
				cityLat: '',
				displayMap: ``,
				error: false,
				errorMessages: '',
				weatherData: []
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

		    // build out the URL with the query parameters needed to get data back from LocationIQ
				let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
				
				let cityData = await axios.get(url);

				let server = process.env.REACT_APP_SERVER_URL;
				
				let weatherURL = `${server}/weather`;

				let weatherData = await axios.get(weatherURL, { params: {}});
				console.log(weatherData);

				let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityLat},${this.state.cityLon}&zoom=14&size=400x400`

				console.log(cityData.data[0]);
				console.log(cityData);
				
				this.setState({
					displayName: cityData.data[0].display_name,
					cityLat: cityData.data[0].lat,
					cityLon: cityData.data[0].lon,
					displayMap: cityMap,
					weatherData: weatherData.data
				})
	} 
	
	catch(error){
		this.setState({
			error: true,
			errorMessage: `${error.message}`
		})
	};

handleClose = () => {
	this.setState({error: false});
};

render() {
	let weather = this.state.weatherData.map(day => {
		return <li>day.description</li>
	})

	return (
		<div>
		<header>
		<Form onSubmit={this.getCityData}>
			<Form.Label className='label'> Pick a city!
				<input className='city' type="text" onInput={this.handleInput} />
			</Form.Label>
			<Button className='explore' type='submit'>Explore!</Button>
		</Form>
		</header>


		<main>
			{
				this.state.weatherData.length > 0 &&
			<ul>
				{weather}
			</ul>
			}
		<Card style={{ width: '18rem' }}>
			<Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityLat},${this.state.cityLon}&zoom=14&size=400x400`} alt = 'Picture of map' />
			<Card.Body>
				<Card.Title>{this.state.city}</Card.Title>
				<div className='lonlat'>
				<Card.Text className='text'>
					<div>Longitude: {this.state.cityLon}</div>
				
					<div>Latitude: {this.state.cityLat}</div>
				</Card.Text>
				</div>
			</Card.Body>
		</Card>
		</main>
		</div>
	);
	}
}

export default App;
