import React from 'react';
const styles = {
home: {
	padding: '50px',
	textAlign: 'center',
	backgroundColor: '#28462f',
	color: 'white',
}
};
export default class Home extends React.Component {
render() {
	return <div style={styles.home}>
	<h1>Home Page</h1>
	
	<p>This is the Landing Page of the Application</p>
</div>;
}
}
