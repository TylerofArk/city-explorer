import React from 'react';
import axios from 'axios';

class App extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				city: '',
				cityData: [],
				error: false,
				errorMessages: ''
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

				console.log(cityData.data[0])
	}

render() {
	return (
		<>
		<form onSubmit={this.getCityData}>
			<label> Pick a city!
				<input type="text" onInput={this.handleInput} />
			</label>
			<button type='submit'>Explore!</button>
		</form>
		</>
	);
	}
}
export default App;
