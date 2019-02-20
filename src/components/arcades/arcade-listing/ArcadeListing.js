import React from 'react';
import { ArcadeList } from './ArcadeList';
import { connect } from 'react-redux'
import * as actions from 'actions'

class ArcadeListing extends React.Component {

	componentWillMount() {
			this.props.dispatch(actions.fetchArcades());
	}

	render() {
		return (
		 <section id="arcadeListing">
		    <h1 className="page-title">Salony VR z całego świata</h1>
		    <ArcadeList arcades={this.props.arcades} />
		  </section>
		)
	}
}

function mapStateToProps(state) {
	return {
		arcades: state.arcades.data
	}
}

export default connect(mapStateToProps)(ArcadeListing)