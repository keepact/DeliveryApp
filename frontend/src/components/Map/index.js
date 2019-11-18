import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import { withRouter } from 'react-router-dom';
import { GoogleMap, DirectionsRenderer } from 'react-google-maps';
import api from '../../services/api';

import MapStyles from './styles';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);
Geocode.setLanguage('pt-BR');

function Maps({ match }) {
  const [directions, setDirections] = useState('');

  async function loadData() {
    const response = await api.get(`/deliveries/${match.params.id}`);

    const { start_point, end_point } = response.data;

    const startPoint = await Geocode.fromAddress(start_point);
    const { lat, lng } = startPoint.results[0].geometry.location;

    const endPoint = await Geocode.fromAddress(end_point);
    const {
      lat: latitude,
      lng: longitude,
    } = endPoint.results[0].geometry.location;

    const directionsService = new window.google.maps.DirectionsService();

    const origin = { lat, lng };
    const destination = { lat: latitude, lng: longitude };

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          console.log(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: -22.9035, lng: -43.2096 }}
      defaultOptions={{ styles: MapStyles }}
    >
      <DirectionsRenderer directions={directions} />
    </GoogleMap>
  );
}

export default withRouter(Maps);
