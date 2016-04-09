import React from 'react';

class AuthSuccess extends React.Component {

	componentDidMount() {
		this.closeWindow();
	}

	closeWindow() {
		if(window.opener) {
			window.opener.location.reload();
		}
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