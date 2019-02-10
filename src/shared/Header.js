import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
<nav className='navbar navbar-dark navbar-expand-lg'>
  <div className='container'>
    <Link className='navbar-brand' to='/arcades'>VRowly</Link>
    <form className='form-inline my-2 my-lg-0'>
      <input className='form-control mr-sm-2 gk-search' type='search' placeholder='Wpisz lokalizacje' aria-label='Search'></input>
      <button className='btn btn-outline-success my-2 my-sm-0 btn-gk-search' type='submit'>Szukaj</button>
    </form>
    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded="false" aria-label="Toggle navigation">
      <span className='navbar-toggler-icon'></span>
    </button>
    <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
      <div className='navbar-nav ml-auto'>
        <a className='nav-item nav-link active' href=''>Logowanie <span className='sr-only'>(current)</span></a>
        <a className='nav-item nav-link' href=''>Rejestracja</a>
      </div>
    </div>
  </div>
</nav>
      )
}