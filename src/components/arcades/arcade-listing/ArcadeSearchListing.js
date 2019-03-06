import React from 'react';
import { ArcadeList } from './ArcadeList';
import { connect } from 'react-redux'
import * as actions from 'actions'

import { toUpperCase } from 'helpers';

class ArcadeSearchListing extends React.Component {

	constructor() {
		super();

		this.state = {
			searchedCity: ''
		}
	}

	componentWillMount() {
		this.searchArcadeByCity();
	}

	componentDidUpdate(prevProps) {
		const currentUrlParam = this.props.match.params.city;
		const prevUrlParam = prevProps.match.params.city;

		if (currentUrlParam !== prevUrlParam) {
			this.searchArcadeByCity();
		}
	}

	searchArcadeByCity() {
		const searchedCity = this.props.match.params.city;
		this.setState({searchedCity});

		this.props.dispatch(actions.fetchArcades(searchedCity));
	}

	renderTitle() {
		const { errors, data } = this.props.arcades;
		const { searchedCity } = this.state;
		let title = '';

		if (errors.length > 0) {
			title = errors[0].detail;
		} 

		if(data.length > 0) {
			title = `Twoja strona główna w mieście ${toUpperCase(searchedCity)}`;
		}

		return <h1 className="page-title">{title}</h1>
	}

	render() {
		return (
		 <section id="arcadeListing">
		 	{this.renderTitle()}
		    <ArcadeList arcades={this.props.arcades.data} />
		  </section>
		)
	}
}

function mapStateToProps(state) {
	return {
		arcades: state.arcades
	}
}

export default connect(mapStateToProps)(ArcadeSearchListing)