import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import type { MapMarker } from '../../types/map';

// Fix for default markers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (Icon.Default.prototype as typeof Icon.Default.prototype & { _getIconUrl?: unknown })._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface MapViewProps {
  center?: LatLngExpression;
  zoom?: number;
  className?: string;
  markers?: MapMarker[];
}

const MapView = ({ 
  center = [48.2082, 16.3738], // Vienna coordinates
  zoom = 13,
  className = "",
  markers = []
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
          <Marker 
            key={marker.id} 
            position={marker.position}
          >
            <Popup>
              <div className="text-center max-w-xs">
                <h3 className={`font-bold text-lg mb-2 ${
                  marker.type === 'official' 
                    ? 'text-dionysos-spring-main' 
                    : 'text-dionysos-purple'
                }`}>
                  {marker.title}
                </h3>
                {marker.address && (
                  <p className="text-sm text-gray-700 mb-1">
                    📍 {marker.address}
                  </p>
                )}
                {marker.district && (
                  <p className="text-sm text-gray-700 mb-1">
                    🏛️ {marker.district}. Bezirk
                  </p>
                )}
                <p className="text-sm text-gray-700 mb-2">{marker.description}</p>
                <div className="flex justify-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    marker.type === 'official' 
                      ? 'bg-dionysos-spring-main/20 text-dionysos-spring-main' 
                      : 'bg-dionysos-purple/20 text-dionysos-purple'
                  }`}>
                    {marker.category}
                  </span>
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