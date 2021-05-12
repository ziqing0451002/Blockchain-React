import React from 'react';
import UserLoginComponent from '../components/UserLoginComponent'
const styles = {
	about: {
		padding: '150px',
		textAlign: 'center',
		// backgroundColor: '#474e5d',
		color: 'black',
	}
};

export default class UserLoginController extends React.Component {
	render() {
		return <div style={styles.about}>

			<UserLoginComponent />

		</div>;
	}
}

