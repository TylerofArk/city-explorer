import React from 'react';
import Card from 'react-bootstrap/Card';

class Weather extends React.Component {



	render() {
		let weatherArr = this.props.weatherData.map((value, i) => (
			<Card style={{width: '18rem'}} key = {i}>
				<Card.Body>
					<Card.Text>
						{value.date}
					</Card.Text>
					<Card.Text>
					{value.description}
					</Card.Text>
				</Card.Body>
			</Card>
		))
		return(
			<>
				{weatherArr}
			</>
		)
	}
}

export default Weather;