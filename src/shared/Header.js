import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ArcadeSearchInput from 'components/arcades/ArcadeSearchInput';

class Header extends React.Component {

  constructor() {
    super();

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
    this.props.history.push('/arcades');
  }

  renderAuthButtons(isAuth) {
    if (isAuth) {
      return <a className='nav-item nav-link clickable' onClick={this.handleLogout}>Wyloguj</a>
    }

    return (
        <React.Fragment>
            <Link className='nav-item nav-link' to='/login'>Logowanie <span className='sr-only'>(current)</span></Link>
            <Link className='nav-item nav-link' to='/register'>Rejestracja</Link>
        </React.Fragment>
      )
  }

  renderOwnerSection(isAuth) {
    if (isAuth) {
      return (
       <div className="nav-item dropdown">
          <a className="nav-link nav-item dropdown-toggle clickable" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Panel
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Link className="dropdown-item" to="/arcades/new">Dodaj salon</Link>
            <Link className="dropdown-item" to="/arcades/manage">Zarządzaj salonami</Link>
            <Link className="dropdown-item" to="/bookings/manage">Zarządzaj rezerwacjami</Link>
          </div>
        </div>
      )
    }
  }

render(){
  const {username, isAuth} = this.props.auth;

    return (
      <nav className='navbar navbar-dark navbar-expand-lg'>
        <div className='container'>
          <Link className='navbar-brand' to='/arcades'>
          <img src={process.env.PUBLIC_URL + '/img/logo.svg'} alt=""/>
          </Link>
          <ArcadeSearchInput />
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded="false" aria-label="Toggle navigation">
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav ml-auto'>
            { isAuth && 
              <a className='nav-item nav-link'>{username}</a>
            }
            {this.renderOwnerSection(isAuth)}
            {this.renderAuthButtons(isAuth)}
            </div>
          </div>
        </div>
      </nav>
     )
  }
}


function mapStateToProps(state) {
  return{
    auth: state.auth
  }
}

export default withRouter(connect(mapStateToProps)(Header));