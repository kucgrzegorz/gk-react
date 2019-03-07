import React from 'react';
import { Link } from 'react-router-dom';
import { pretifyDate, toUpperCase } from 'helpers';

export function BookingCard(props) {

	const { booking } = props;

	return (
		<div className='col-md-4'>
		      <div className='card text-center'>
		        <div className='card-header'>
		        {booking.arcade ? booking.arcade.category : 'Salon usunięty'}
		        </div>
		        <div className='card-block'>
		        {booking.arcade &&
		        	<div>
		        	<h4 className='card-title'> {booking.arcade.title} - {toUpperCase(booking.arcade.city)}</h4>
		         	<p className='card-text booking-desc'>{booking.arcade.description}</p>
		         	</div>
		       	 }
		          <p className='card-text booking-days'>{pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)} | {booking.days} dni</p>
		          <p className='card-text booking-price'><span>Cena: </span> <span className='booking-price-value'>{booking.totalPrice} zł</span></p>
		          {booking.arcade && 
		          	<Link className='btn btn-bwm' to={`/arcades/${booking.arcade._id}`}> Przejdź do salonu </Link>
		       		}
		        </div>
		        <div className='card-footer text-muted'>
		          Created {pretifyDate(booking.createdAt)}
		        </div>
		      </div>
		    </div>
		)

}