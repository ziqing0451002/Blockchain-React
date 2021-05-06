import React from 'react';
import UserListComponent from '../components/UserListComponent'
const styles = {
	about: {
		padding: '150px',
		textAlign: 'center',
		// backgroundColor: '#474e5d',
		color: 'black',
	}
};

export default class UserListController extends React.Component {
	render() {
		return <div style={styles.about}>

			<UserListComponent />

		</div>;
	}
}

