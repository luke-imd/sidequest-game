import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import type { MapMarker } from '../../types/map';

interface MapViewProps {
  center?: LatLngExpression;
  zoom?: number;
  className?: string;
  markers?: MapMarker[];
}

const sampleMarkers: MapMarker[] = [
  {
    id: '1',
    position: [48.2082, 16.3738],
    title: 'Stephansdom',
    description: 'Historic cathedral in the heart of Vienna',
    type: 'official',
    category: 'landmark'
  },
  {
    id: '2', 
    position: [48.2010, 16.3695],
    title: 'Luke\'s Favorite Coffee Spot',
    description: 'Best espresso in the city center!',
    type: 'private',
    createdBy: 'luke'
  },
  {
    id: '3',
    position: [48.2125, 16.3731],
    title: 'Water Fountain',
    description: 'Public drinking water fountain',
    type: 'official',
    category: 'water'
  }
];

const MapView = ({ 
  center = [48.2082, 16.3738], // Vienna coordinates
  zoom = 13,
  className = "",
  markers = sampleMarkers
}: MapViewProps) => {
  return (
    <div className={`w-full h-full ${className}`} style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full rounded-lg shadow-lg border-2 border-dionysos-spring-main/20"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position}>
            <Popup>
              <div className="text-center max-w-xs">
                <h3 className={`font-bold text-lg mb-2 ${
                  marker.type === 'official' 
                    ? 'text-dionysos-spring-main' 
                    : 'text-dionysos-purple'
                }`}>
                  {marker.title}
                </h3>
                <p className="text-sm text-gray-700 mb-2">{marker.description}</p>
                <div className="flex justify-between items-center text-xs">
                  <span className={`px-2 py-1 rounded-full ${
                    marker.type === 'official' 
                      ? 'bg-dionysos-spring-main/20 text-dionysos-spring-main' 
                      : 'bg-dionysos-purple/20 text-dionysos-purple'
                  }`}>
                    {marker.type}
                  </span>
                  {marker.category && (
                    <span className="text-gray-500">
                      #{marker.category}
                    </span>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;