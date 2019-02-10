import React from 'react';
import { ArcadeCard } from './ArcadeCard';

export class ArcadeList extends React.Component {



	renderArcades() { //renderowanie dynamiczne ArcadeCard (iteracja tablicy Arcade, każda iteracja renderuje ArcadeCard)
		return this.props.arcades.map((arcade, index) => {
			return (
				<ArcadeCard key={index} 
				colNum='col-md-3 col-xs-6' 
				arcade={arcade}/>
				)
	});
	}
	render() {
		return (
		    <div className="row">
		     {this.renderArcades()}
		    </div>
		)
	}
}