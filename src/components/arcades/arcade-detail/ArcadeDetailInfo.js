import React from 'react';
import { ArcadeAssets } from './ArcadeAssets';
import { toUpperCase, arcadeType } from 'helpers';

export function ArcadeDetailInfo(props) {
	const arcade = props.arcade;

	return (
		 <div className='arcade'>
          <h2 className={`arcade-type ${arcade.category}`}>{arcadeType(arcade.shared)} {arcade.category}</h2>
              <div className='arcade-owner'>
                <img src='https://cdn.icon-icons.com/icons2/1310/PNG/512/vr_86348.png' alt='owner'/>
                <span>{arcade.user && arcade.user.username}</span>
              </div>
          <h1 className='arcade-title'>{arcade.title}</h1>
          <h2 className='arcade-city'>{toUpperCase(arcade.city)}</h2>
          <p className='arcade-description'>
            {arcade.description}
          </p>
          <hr></hr>
          <ArcadeAssets />
        </div>
		)
}