import React from 'react';
import WeatherDayCard from './WeatherDayCard';


class Weather extends React.Component {

	render() {
		let weatherArr = this.props.weatherData.map((value, i) => (
			<WeatherDayCard value={value} key={i}/>
		))
		return(
			<>
				{weatherArr}
			</>
		)
	}
}

export default Weather;