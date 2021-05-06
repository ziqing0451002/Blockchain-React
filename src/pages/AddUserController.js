import React from 'react';
import AddUserComponent from '../components/AddUserComponent'
const styles = {
	about: {
		padding: '150px',
		textAlign: 'center',
		// backgroundColor: '#474e5d',
		color: 'black',
	}
};

export default class AddUserController extends React.Component {
	render() {
		return <div style={styles.about}>

			<AddUserComponent />

		</div>;
	}
}

