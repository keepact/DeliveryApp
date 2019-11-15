import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import api from '../../services/api';

import location from '../../assets/images/location.svg';
import MapStyles from './styles';

function Map() {
  const [mapData, setMapData] = useState([]);
  const [point, setPoint] = useState(null);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('/deliveries');

      const data = response.data.map(d => ({
        ...d,
      }));
      setMapData(data);
    }
    loadData();
  }, []);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
      defaultOptions={{ styles: MapStyles }}
    >
      {mapData.map(m => (
        <Marker
          key={m.id}
          position={{
            lat: parseInt(m.end_point, 10),
            lng: parseInt(m.start_point, 10),
          }}
          onClick={() => {
            setPoint(m);
          }}
          icon={{
            url: location,
            scaledSize: new window.google.maps.Size(25, 25),
          }}
        />
      ))}

      {point && (
        <InfoWindow
          position={{
            lat: parseInt(point.end_point, 10),
            lng: parseInt(point.start_point, 10),
          }}
          onCloseClick={() => {
            setPoint(null);
          }}
        >
          <div>{point.name}</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default Map;
