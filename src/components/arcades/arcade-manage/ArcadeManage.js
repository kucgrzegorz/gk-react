import React from 'react';
import * as actions from 'actions';
import { Link } from 'react-router-dom';
import { ArcadeManageCard } from './ArcadeManageCard';
import { ArcadeManageModal } from './ArcadeManageModal';
import { ToastContainer, toast } from 'react-toastify';

export class ArcadeManage extends React.Component {


	constructor() {
		super();

		this.state = {
			userArcades: [],
			errors: [],
			isFetching: false
		}

		this.deleteArcade = this.deleteArcade.bind(this);
	}

	componentWillMount() {
		this.setState({isFetching: true});
		actions.getUserArcades().then(
			userArcades => this.setState({userArcades, isFetching: false}),
			errors => this.setState({errors, isFetching: false}))
	}

	renderArcadeCards(arcades) {
    return arcades.map((arcade, index) =>
     <ArcadeManageCard modal={<ArcadeManageModal bookings={arcade.bookings}/>}
                       key={index}
                       arcade={arcade}
                       arcadeIndex={index}
                       deleteArcadeCb={this.deleteArcade} />);
  }

  deleteArcade(arcadeId, arcadeIndex) {
    actions.deleteArcade(arcadeId).then(
      () => this.deleteArcadeFromList(arcadeIndex),
      errors => toast.error(errors[0].detail))
  }

  deleteArcadeFromList(rentalIndex) {
    const userArcades = this.state.userArcades.slice();
    userArcades.splice(rentalIndex, 1);

    this.setState({userArcades});
  }

	render() {
		const { userArcades, isFetching } = this.state;

		return (
				<section id='userArcades'>
				<ToastContainer />
				  <h1 className='page-title'>Twoje Salony</h1>
				  <div className='row'>
				  {this.renderArcadeCards(userArcades)}
				  </div>
				  { !isFetching && userArcades.length === 0 &&
				  <div className='alert alert-warning'>
				    Aktualnie nie posiadasz dodanych salonów. Kliknij w znajdujący się obok przycisk w celu dodania swojego salonu.
				    <Link style={{'marginLeft': '10px'}} className='btn btn-bwm' to='/arcades/new'>Dodaj salon</Link>
				  </div>
					}
				</section>
			)
	}
}