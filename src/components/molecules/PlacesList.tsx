import type { Place } from '../../data/viennaPlaces';

interface PlacesListProps {
  places: Place[];
  className?: string;
}

const PlacesList = ({ places, className = "" }: PlacesListProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-4 h-full flex flex-col ${className}`}>
      <h2 className="text-xl font-bold text-dionysos-spring-main mb-4">
        Vienna Places
      </h2>
      <div className="space-y-3 flex-1 overflow-y-auto">
        {places.map((place) => (
          <div
            key={place.id}
            className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <h3 className="font-semibold text-gray-900 mb-1">{place.name}</h3>
            <p className="text-sm text-gray-600 mb-1">📍 {place.address}</p>
            <p className="text-sm text-gray-600 mb-1">🏛️ {place.district}. Bezirk</p>
            <div className="flex items-center justify-between">
              <span className="inline-block px-2 py-1 bg-dionysos-spring-main/20 text-dionysos-spring-main text-xs rounded-full">
                {place.category}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">{place.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesList;