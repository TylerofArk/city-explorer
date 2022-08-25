import React from 'react';
import Card from 'react-bootstrap/Card';

class Movies extends React.Component {



	render() {
		let movieArr = this.props.movieData.map((value, i) => (
			<Card style={{width: '18rem'}} key = {i}>
				<Card.Body>
					<Card.Text>
						{value.name}
					</Card.Text>
				</Card.Body>
			</Card>
		))
		return(
			<>
				{movieArr}
			</>
		)
	}
}

export default Movies;