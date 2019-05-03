import React from 'react';
import Modal from 'react-responsive-modal';
import { BwmResError } from 'shared/form/BwmResError';

export function BookingModal(props) {
		const { open, closeModal, booking, confirmModal, errors, arcadePrice } = props;

	return (
			<Modal open={open} onClose={closeModal} little classNames={{ modal: 'booking-modal' }}>
			   <h4 className='modal-title title'> Potwierdź rezerwację </h4>
			   <p className='dates'>{booking.startAt} / {booking.endAt}</p>
			   <div className='modal-body'>
			    <p>Ilość gości: <em>{booking.guests}</em></p>
			  </div>
			  <BwmResError errors={errors} />
			  <div className='modal-footer'>
			    <button onClick={confirmModal} type='button' className='btn btn-bwm'>Potwierdź</button>
			    <button type='button' onClick={closeModal} className='btn btn-bwm'>Zamknij</button>
			  </div>
			</Modal>
	)
}