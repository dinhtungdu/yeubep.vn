import React from 'react';
import {Link} from 'react-router';

class Breadcrumb extends React.Component {
	render() {
		let styles = {
			master: {
				fontSize: '13px',
				textShadow: '1px 1px 3px #666',
				color: '#fff'
			},
			a: {
				color: '#fff',
			},
			divider: {
				margin: '0 6px'
			}
		};
		return(
			<nav style={styles.master} className="Breadcrumb">
				<Link style={styles.a} to='/'>Trang chủ</Link>
				<span style={styles.divider}>/</span>
				{this.props.category ?
					<span>
						<Link style={styles.a} to={'/category/' + this.props.category._id}>{this.props.category.name}</Link>
						<span style={styles.divider}>/</span>
					</span>
					: null
				}
				{this.props.current ?
					<span>{this.props.current}</span>
					: null
				}
			</nav>
		);
	}
}

export default Breadcrumb;