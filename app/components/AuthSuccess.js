import React from 'react';

class AuthSuccess extends React.Component {

	componentDidMount() {
		window.opener.postMessage('loggedIn', '*');
		this.closeWindow();
	}

	closeWindow() {
		window.close();
	}

	render() {
		return(
			<div>
				Hello!
			</div>
		);
	}
}
export default AuthSuccess;