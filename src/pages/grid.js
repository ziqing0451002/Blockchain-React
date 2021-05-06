import React from 'react';
const styles = {
	about: {
		padding: '150px',
		textAlign: 'center',
		backgroundColor: '#474e5d',
		color: 'white',
	}
};

export default class Grid extends React.Component {
	render() {
		return <div style={styles.about}>
			<h1>Grid Page</h1>

			<p>This is the Landing Page of the Application</p>

		</div>;
	}
}

