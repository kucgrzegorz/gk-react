import React from 'react';
import { connect } from 'react-redux';
import { ArcadeDetailInfo } from './ArcadeDetailInfo';
import { ArcadeMap } from './ArcadeMap';
import { Booking } from 'components/booking/Booking';

import * as actions from 'actions'

class ArcadeDetail extends React.Component {

	componentWillMount() {
		const arcadeId = this.props.match.params.id;

		this.props.dispatch(actions.fetchArcadeById(arcadeId));
	}

	render() {
		const arcade = this.props.arcade;

		if (arcade._id) {
			return (
				<section id='arcadeDetails'>
				  <div className='upper-section'>
				    <div className='row'>
				      <div className='col-md-6'>
				        <img src={arcade.image} alt=''></img>
				      </div>
				      <div className='col-md-6'>
				       <ArcadeMap location={`${arcade.city}, ${arcade.street}`} />
				      </div>
				    </div>
				  </div>
				  <div className='details-section'>
				    <div className='row'>
				      <div className='col-md-8'>
				       <ArcadeDetailInfo arcade={arcade} />
				      </div>
				      <div className='col-md-4'> 
				      <Booking arcade={arcade} />
				      </div>
				    </div>
				  </div>
				</section>
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