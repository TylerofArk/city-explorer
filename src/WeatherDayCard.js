import React from "react";
import Card from 'react-bootstrap/Card';

class WeatherDayCard extends React.Component{
	render(){
		return(
			<Card style={{width: '18rem'}}>
				<Card.Body>
					<Card.Text>
						{this.props.value.date}
					</Card.Text>
					<Card.Text>
					{this.props.value.description}
					</Card.Text>
				</Card.Body>
			</Card>
		)
	}
}

export default WeatherDayCard;