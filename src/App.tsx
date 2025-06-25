import MapView from './components/organisms/MapView';
import PlacesList from './components/molecules/PlacesList';
import { viennaPlaces } from './data/viennaPlaces';
import { convertPlacesToMarkers } from './utils/viennaPlaceCoordinates';

function App() {
  const viennaMarkers = convertPlacesToMarkers(viennaPlaces);
  
  return (
    <div className="bg-dionysos-spring-bg p-4 min-h-screen">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-center text-4xl font-bold text-dionysos-spring-main mb-8">
          Sidequest Community Map
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 md:h-[600px]">
            <MapView markers={viennaMarkers} />
          </div>
          <div className="lg:col-span-1 h-96 md:h-[600px]">
            <PlacesList places={viennaPlaces} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
