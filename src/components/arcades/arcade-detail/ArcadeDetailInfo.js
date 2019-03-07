import React from 'react';
import { ArcadeAssets } from './ArcadeAssets';
import { toUpperCase, arcadeType } from 'helpers';

export function ArcadeDetailInfo(props) {
	const arcade = props.arcade;

	return (
		 <div className='arcade'>
          <h2 className={`arcade-type ${arcade.category}`}>{arcadeType(arcade.shared)} {arcade.category}</h2>
              <div className='arcade-owner'>
                <img src='https://api.adorable.io/avatars/285/abott@adorable.png' alt='owner'/>
                <span>{arcade.user && arcade.user.username}</span>
              </div>
          <h1 className='arcade-title'>{arcade.title}</h1>
          <h2 className='arcade-city'>{toUpperCase(arcade.city)}</h2>
          <div className='arcade-room-info'>
            <span><i className='fa fa-building'></i>{arcade.bedrooms} bedrooms</span>
            <span><i className='fa fa-user'></i> {arcade.bedrooms + 4} guests</span>
            <span><i className='fa fa-bed'></i> {arcade.bedrooms + 2} beds</span>
          </div>
          <p className='arcade-description'>
            {arcade.description}
          </p>
          <hr></hr>
          <ArcadeAssets />
        </div>
		)
}