import React from 'react';
import { Cacher } from 'services/cacher';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
} from "react-google-maps";

function MapComponent(props) {
  const coordinates = props.coordinates;

  return (
    <GoogleMap
    defaultZoom={13}
    defaultCenter={coordinates}
    center={coordinates}
  >
    <Circle center={coordinates} radius={500} />

  </GoogleMap>
  )
}

function withGeocode(WrappedComponent) {
  return class extends React.Component {

    constructor(){
      super();

      this.cacher = new Cacher();
      this.state = {
        coordinates: {
          lat: 0,
          lng: 0
        }
      }

    }

    componentWillMount() {
      this.getGeocodedLocation();
    }

    updateCoordinates(coordinates) {
      this.setState({
        coordinates,
        isLocationLoaded: true
      })
    }

    geocodeLocation(location) {
            const geocoder = new window.google.maps.Geocoder();

      return new Promise((resolve, reject) => {
             geocoder.geocode({address: location}, (result, status) => { 
                
                if (status === 'OK') {
                  const geometry = result[0].geometry.location;
                  const coordinates = { lat: geometry.lat(), lng: geometry.lng()};

                  this.cacher.cacheValue(location, coordinates);

                  resolve(coordinates);

                } else {
                  reject('ERROR!!!!');
                }
              });
      });
    }

    getGeocodedLocation() {
      const location = this.props.location;


      if (this.cacher.isValueCached(location)) {
        this.updateCoordinates(this.cacher.getCachedValue(location));

      } else {
        this.geocodeLocation(location).then(
          (coordinates) => {
              this.updateCoordinates(coordinates);
          },
          (error) => {
            console.log(error);
          });
      }
    }


    render() {
      return(
        <WrappedComponent {...this.state}/>
        )
    }
  }
}

export const MapWithGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent)));

