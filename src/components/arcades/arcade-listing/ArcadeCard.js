import React from 'react';
import { Link } from 'react-router-dom';

export function ArcadeCard(props) {
 const arcade = props.arcade;

	return (
    <div className={props.colNum}>
    <Link className='arcade-detail-link' to={`/arcades/${arcade.id}`}>
      <div className='card gk-card'>
        <img className='card-img-top' src={arcade.image} alt={arcade.title}></img>
        <div className='card-block'>
          <h6 className={`card-subtitle ${arcade.category}`}>{arcade.shared ? 'shared' : 'whole'} {arcade.category} &#183; {arcade.city}</h6>
          <h4 className='card-title'>{arcade.title}</h4>
          <p className='card-text'>${arcade.dailyRate} / wizyta &#183; Darmowa rezygnacja</p>
          </div>
        </div>
     </Link>
   </div>
	)
}