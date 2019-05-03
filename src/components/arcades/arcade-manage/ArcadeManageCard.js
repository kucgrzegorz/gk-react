import React from 'react';
import { toUpperCase, pretifyDate } from 'helpers';
import { Link } from 'react-router-dom';

export class ArcadeManageCard extends React.Component {

	constructor() {
		super();

		this.state = {
			wantDelete: false
		}
	}

	showDeleteMenu() {
		this.setState({
			wantDelete: true
		});
	}

	closeDeleteMenu() {
		this.setState({
			wantDelete: false
		})
	}

	deleteArcade(arcadeId, arcadeIndex) {
		this.setState({wantDelete: false});

		this.props.deleteArcadeCb(arcadeId, arcadeIndex);
	}

  render() {
const { arcade, modal, arcadeIndex } = this.props;
const { wantDelete } = this.state;

const deleteClass = wantDelete ? 'toBeDeleted' : '';



	return (
		 <div className='col-md-4'>
	      <div className={`card text-center ${deleteClass}`}>
	        <div className='card-block'>
	          <h4 className='card-title'>{arcade.title} - {toUpperCase(arcade.city)}</h4>
	          <Link className='btn btn-bwm' to={`/arcades/${arcade._id}`}>Przejdź do salonu</Link>
	          { arcade.bookings && arcade.bookings.length > 0 && modal }
	       	 </div>
	        <div className='card-footer text-muted'>
	          Stworzone {pretifyDate(arcade.createdAt)}
	          { !wantDelete &&
	          <button onClick={() => { this.showDeleteMenu() }} className='btn btn-danger'> Usuń </button>
	      		}
	      		{ wantDelete &&
	      			<div className='delete-menu'>
	      			Jesteś pewien?
	      			<button onClick={() => {this.deleteArcade(arcade._id, arcadeIndex)}} className='btn btn-danger'> Tak </button>
					<button onClick={() => { this.closeDeleteMenu() }} className='btn btn-success'> Nie </button>
	      			</div>
	      		}
	        </div>
	      </div>
	    </div>
		)
	 }
}