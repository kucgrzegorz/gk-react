import React from 'react';

export function ArcadeAssets() {

	return (
		 <div className='arcade-assets'>
            <h3 className='title'>Informacje dodatkowe</h3>
            <div className='row'>
              <div className='col-md-6'>
                <span><i className='fa fa-smile-o'></i> Przyjazna atmosfera</span>
                <span><i className='fa fa-gamepad'></i> Najnowsze aplikacje</span>
                <span><i className='fa fa-users'></i> Profesjonalna obsługa</span>
              </div>
              <div className='col-md-6'>
                <span><i className='fa fa-desktop'></i> Komputery </span>
                <span><i className="fa fa-cubes"></i> Sprzęt VR</span>
                <span><i className='fa fa-cube'></i> Symulatory</span>
              </div>
            </div>
          </div>
		)
}