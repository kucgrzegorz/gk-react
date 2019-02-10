import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions'

class ArcadeDetail extends React.Component {

	componentWillMount() {
		const arcadeId = this.props.match.params.id;

		this.props.dispatch(actions.fetchArcadeById(arcadeId));
	}

	render() {
		const arcade = this.props.arcade;

		if (arcade.id) {
			return (
			<div>
				<h1>{arcade.title}</h1>
				<h1>{arcade.city}</h1>
				<h1>{arcade.description}</h1>
				<h1>{arcade.dailyRate}$</h1>
			</div>
			)
		} else {
			return (
			<h1>Loading...</h1>
			)
		}
	}
}

	function mapStateToProps(state) {
		return {
			arcade: state.arcade.data
	}

}

export default connect(mapStateToProps)(ArcadeDetail)