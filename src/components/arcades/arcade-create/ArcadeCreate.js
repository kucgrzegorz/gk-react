import React from 'react';
import ArcadeCreateForm from './ArcadeCreateForm';
import { Redirect } from 'react-router-dom';

import * as actions from 'actions';

export class ArcadeCreate extends React.Component {

	constructor() {
		super();

		this.state = {
			errors: [],
			redirect: false
		}

		this.arcadeCategories = ['Salon', 'Kino', 'Pokój zagadek'];

		this.createArcade = this.createArcade.bind(this);
	}

	createArcade(arcadeData) {
		actions.createArcade(arcadeData).then(
			(arcade) => this.setState({redirect: true}),
			(errors) => this.setState({errors}))
	}

	render() {

		if (this.state.redirect) {
			return <Redirect to={{pathname:'/arcades'}}/>
		
		}

		return(
			<section id='newRental'>
			  <div className='bwm-form'>
			    <div className='row'>
			      <div className='col-md-5'>
			        <h1 className='page-title'>Dodaj informacje o Salonie</h1>
			        <ArcadeCreateForm submitCb={this.createArcade} 
			        					options={this.arcadeCategories}
			        					errors={this.state.errors}/>
			      </div>
			      <div className='col-md-6 ml-auto'>
			        <div className='image-container'>
			          <h2 className='catchphrase'>Salony VR z całego świata na wyciągnięcie reki.</h2>
			          <img src={process.env.PUBLIC_URL + '/img/create-arcade.jpg'} alt=''/>
			        </div>
			      </div>
			    </div>
			  </div>
			</section>
		)
	}
}