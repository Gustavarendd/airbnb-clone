'use client';
import {
  GoogleMap,
  LoadScript,
  LoadScriptNext,
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

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyASr2-zTezHK_HQDq9hqQDVCM_Yj4jSsaM',
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  if (loadError) {
    return <p>Error!</p>;
  }

  return (
    <div className="flex items-center justify-center">
      {/* @ts-ignore */}
      <GoogleMap
        options={mapOptions}
        zoom={10}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '400px', height: '400px' }}
        onLoad={() => console.log('Map Component Loaded...')}
      >
        <MarkerF position={mapCenter} />
      </GoogleMap>
    </div>
  );
};

export default LocationMap;
