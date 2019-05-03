import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { ToastContainer, toast } from 'react-toastify';
import { BookingModal } from './BookingModal';
import { getRangeOfDates } from 'helpers';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as moment from 'moment';
import * as actions from 'actions';

class Booking extends React.Component {

  constructor() {
    super();

    this.bookedOutDates = [];
    this.dateRef = React.createRef();

    this.state = {
      proposedBooking: {
        startAt: '',
        endAt: '',
        guests: ''
      },
      modal: {
        open: false
      },
      errors: []
    }

    this.checkInvalidDates = this.checkInvalidDates.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.cancelConfirmation = this.cancelConfirmation.bind(this);
    this.reserveArcade = this.reserveArcade.bind(this);
  }

  componentWillMount() {
    this.getBookedOutDates();
  }

  getBookedOutDates() {
    const {bookings} = this.props.arcade;

    if (bookings && bookings.length > 0 ) {
      bookings.forEach(booking => {
        const dateRange = getRangeOfDates(booking.startAt, booking.endAt, 'Y/MM/DD');
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  checkInvalidDates(date) {
    
    return this.bookedOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0;
  }

  handleApply(event, picker) {
    const startAt = picker.startDate.format('Y/MM/DD');
    const endAt = picker.endDate.format('Y/MM/DD');

    this.dateRef.current.value = startAt + 'to' + endAt;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        startAt,
        endAt
      }
    });
  }

  selectGuests(event) {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        guests: parseInt(event.target.value, 10)
      }
    })
  }

  cancelConfirmation() {
    this.setState({
      modal: {
        open: false
      }
    })
  }

  addNewBookedOutDates(booking) {
    const dateRange = getRangeOfDates(booking.startAt, booking.endAt);
    this.bookedOutDates.push(...dateRange);
  }

  resetData() {
    this.dateRef.current.value='';

    this.setState({proposedBooking: {guests: ''}});
  }

  confirmProposedData() {
    const {startAt, endAt} = this.state.proposedBooking;
    const days = getRangeOfDates(startAt, endAt).length - 1;
    const { arcade } = this.props;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        days,
        totalPrice: days * arcade.dailyRate,
        arcade
      },
      modal: {
        open: true
      }
    });
  }

  reserveArcade() {
    actions.createBooking(this.state.proposedBooking).then(
      (booking) => {
        this.addNewBookedOutDates(booking);
        this.cancelConfirmation();
        this.resetData();
        toast.success('Rezerwacja złożona pomyślnie!');
      },
      (errors) => {
        this.setState({errors});
      })
  }

  render() {
    const { arcade, auth: { isAuth } } = this.props;
    const { startAt, endAt, guests } = this.state.proposedBooking;

    return (
      <div className='booking'>
      <ToastContainer />
        <h3 className='booking-price'> {arcade.dailyRate} zł <span className='booking-per-night'>za dzień</span></h3>
        <hr></hr>
        { !isAuth && 
          <Link className='btn btn-bwm btn-confirm btn-block' to={{pathname: '/login'}}> 
          Zaloguj się aby złożyć rezerwację
          </Link>
        }
        { isAuth &&
          <React.Fragment>
              <div className='form-group'>
              <label htmlFor='dates'>Data</label>
              <DateRangePicker onApply={this.handleApply} 
                        isInvalidDate={this.checkInvalidDates} 
                        opens='left' containerStyles={{display: 'block'}}>
                <input ref={this.dateRef} id='dates' type='text' className='form-control'></input>
              </DateRangePicker>
              </div>
              <div className='form-group'>
                <label htmlFor='guests'>Liczba gości</label>
                <input onChange={(event) => ( this.selectGuests(event))} 
                       type='number' 
                       value={guests}
                       className='form-control' 
                       id='guests' 
                       aria-describedby='emailHelp' 
                       placeholder=''>
                 </input>
              </div>
              <button disabled={!startAt || !endAt || !guests} onClick={() => this.confirmProposedData()} className='btn btn-bwm btn-confirm btn-block'>Zarezerwuj wizytę</button>
            </React.Fragment>
          }
        <hr></hr>
        <p className='booking-note-title'>Złóż rezerwację w tym miejscu!</p>
        <p className='booking-note-text'>
          Przeżyj niesamowitą przygodę ze swoją grupą w świecie VR!
        </p>
        <BookingModal open={this.state.modal.open} 
                      closeModal={this.cancelConfirmation}
                      confirmModal={this.reserveArcade}
                      booking={this.state.proposedBooking}
                      errors={this.state.errors}
                      arcadePrice={arcade.dailyRate}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  } 
}

export default connect(mapStateToProps)(Booking)
