
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { SightseeingSpot } from '../lib/getSightseeingData';
import L from 'leaflet';

// This is a workaround for a known issue with react-leaflet and webpack
// https://github.com/PaulLeCam/react-leaflet/issues/808
delete (L.Icon.Default.prototype as any)._getIconUrl; // eslint-disable-line @typescript-eslint/no-explicit-any
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapViewProps {
  spots: SightseeingSpot[];
}

const MapView: React.FC<MapViewProps> = ({ spots }) => {
  if (!spots || spots.length === 0) {
    return <p>No spots to display on map.</p>;
  }

  const position: [number, number] = [spots[0].latitude, spots[0].longitude];

  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {spots.map(spot => (
        <Marker key={spot.resourceCode} position={[spot.latitude, spot.longitude]}>
          <Popup>
            {spot.resourceName}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
