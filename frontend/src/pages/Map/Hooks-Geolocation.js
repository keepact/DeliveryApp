import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import location from '../../assets/images/location.svg';

import api from '../../services/api';

const mapStyles = {
  width: '100%',
  height: '600px',
};

let geocoder;

function MapContainer({ google, match }) {
  const [lat, setLat] = useState(-22.9035);
  const [lng, setLng] = useState(-43.2096);
  const [places, setPlaces] = useState([]);

  geocoder = new google.maps.Geocoder();

  async function getPoints(geocoder) {
    const response = await api.get(`/deliveries/${match.params.id}`);
    const { start_point, end_point } = response.data;

    const locationData = [];
    const addressData = [{ location: start_point }, { location: end_point }];

    for (let i = 0; i < addressData.length; i++) {
      locationData.push(findLatLang(addressData[i].location, geocoder));
    }
    const locations = locationData;
    const zone = new Array();

    Promise.all(locations).then(function(returnVals) {
      returnVals.forEach(function(latLng) {
        const place = { latitude: latLng[0], longitude: latLng[1] };
        zone.push(place);
      });
      setPlaces([...zone]); // array of promises
    });

    // Promise.all(locations).then(function(returnVals) {
    //   returnVals.forEach(function(latLng) {
    //     const place = { latitude: latLng[0], longitude: latLng[1] };
    //     zone.push(place);
    //   });
    // });
    // setPlaces(() => {
    //   return {
    //     places: zone,
    //   };
    // }); // array of promises
  }

  useEffect(() => {
    getPoints(geocoder);
  }, []);

  function findLatLang(address, geocoder) {
    return new Promise(function(resolve, reject) {
      geocoder.geocode(
        {
          address,
        },
        function(results, status) {
          if (status === 'OK') {
            console.log(results, 'ok');
            resolve([
              results[0].geometry.location.lat(),
              results[0].geometry.location.lng(),
            ]);
            console.log(results[0].geometry.location.lat());
            console.log(results[0].geometry.location.lng());
          } else {
            reject(new Error(`Couldnt't find the location ${address}`));
          }
        }
      );
    });
  }

  return (
    <div className="container place-map">
      <div className="row">
        <div className="col-md-12">
          <Map
            google={google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
              lat,
              lng,
            }}
          >
            {/* {places.map(p => (
            <Marker
              position={{
                lat: p.latitude,
                lng: p.longitude,
              }}
              icon={{
                url: location,
                scaledSize: new window.google.maps.Size(25, 25),
              }}
            />
          ))} */}
            {places.map((p, i) => (
              <Marker
                key={i}
                position={{
                  lat: p.latitude,
                  lng: p.longitude,
                }}
                icon={{
                  url: location,
                  scaledSize: new window.google.maps.Size(25, 25),
                }}
              />
            ))}
          </Map>
        </div>
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'api',
})(MapContainer);
