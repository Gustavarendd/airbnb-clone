'use client';
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  useJsApiLoader,
} from '@react-google-maps/api';

import { useMemo } from 'react';

interface MapProps {
  location: number[];
}

const LocationMap: React.FC<MapProps> = ({ location }) => {
  const mapCenter = useMemo(
    () => ({
      lat: location[0],
      lng: location[1],
    }),
    [location],
  );

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    [],
  );

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyASr2-zTezHK_HQDq9hqQDVCM_Yj4jSsaM',
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center">
      <GoogleMap
        options={mapOptions}
        zoom={10}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '100%', height: '500px' }}
        onLoad={() => console.log('Map Component Loaded...')}
      >
        <MarkerF position={mapCenter} />
      </GoogleMap>
    </div>
  );
};

export default LocationMap;
