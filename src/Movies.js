import React from 'react';
import MovieCard from './MovieCard';

class Movies extends React.Component {

	render() {
		let movieArr = this.props.movieData.map((value, i) => (
			<MovieCard value={value} key = {i} />
		))
		return(
			<>
				{movieArr}
			</>
		)
	}
}

export default Movies;