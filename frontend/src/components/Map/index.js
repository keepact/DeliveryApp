import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import { withRouter } from 'react-router-dom';
import { GoogleMap, Marker } from 'react-google-maps';
import api from '../../services/api';

import location from '../../assets/images/location.svg';
import MapStyles from './styles';

function Maps({ match }) {
  Geocode.setApiKey('api');

  Geocode.setLanguage('pt-BR');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latLng, setlatLng] = useState('');
  const [lonLng, setLonlng] = useState('');

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/deliveries/${match.params.id}`);

      const { start_point, end_point } = response.data;

      Geocode.fromAddress(start_point).then(
        res => {
          const { lat, lng } = res.results[0].geometry.location;
          console.log(lat, lng);
          setLatitude(lat);
          setLongitude(lng);
        },
        error => {
          console.error(error);
        }
      );

      Geocode.fromAddress(end_point).then(
        res => {
          const { lat, lng } = res.results[0].geometry.location;
          console.log(lat, lng);
          setlatLng(lat);
          setLonlng(lng);
        },
        error => {
          console.error(error);
        }
      );
    }
    loadData();
  }, []);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: -22.9035, lng: -43.2096 }}
      defaultOptions={{ styles: MapStyles }}
    >
      <Marker
        position={{
          lat: latitude,
          lng: longitude,
        }}
        icon={{
          url: location,
          scaledSize: new window.google.maps.Size(25, 25),
        }}
      />
      <Marker
        position={{
          lat: latLng,
          lng: lonLng,
        }}
        icon={{
          url: location,
          scaledSize: new window.google.maps.Size(25, 25),
        }}
      />
    </GoogleMap>
  );
}

export default withRouter(Maps);
