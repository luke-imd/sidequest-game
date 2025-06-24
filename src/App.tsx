import MapView from './components/organisms/MapView';

function App() {
  return (
    <div className="bg-dionysos-spring-bg p-4 min-h-screen">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-center text-4xl font-bold text-dionysos-spring-main mb-8">
          Sidequest Community Map
        </h1>
        <div className="h-96 md:h-[600px]">
          <MapView />
        </div>
      </div>
    </div>
  )
}

export default App
