import { useState, useEffect } from 'react';
import type { MapMarker, TrinkbrunnenData } from '../types/map';
import { FOUNTAIN_TYPES } from '../types/map';

interface UseTrinkbrunnenReturn {
  fountains: MapMarker[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const VIENNA_FOUNTAIN_API = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TRINKBRUNNENOGD&srsName=EPSG:4326&outputFormat=json';

// Sample fountain data for development/testing when API is not accessible
const SAMPLE_FOUNTAIN_DATA: TrinkbrunnenData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [16.3738, 48.2082] // [longitude, latitude]
      },
      properties: {
        TYP_NUM: 4,
        ADRESSE: "Stephansplatz 3, 1010 Wien",
        BEZIRK: "1",
        BEMERKUNG: "Trinkbrunnen am Stephansplatz",
        OBJECTID: 1
      }
    },
    {
      type: "Feature", 
      geometry: {
        type: "Point",
        coordinates: [16.3606, 48.2085]
      },
      properties: {
        TYP_NUM: 2,
        ADRESSE: "Stadtpark, 1030 Wien",
        BEZIRK: "3",
        BEMERKUNG: "Hundetrinkbrunnen im Stadtpark",
        OBJECTID: 2
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point", 
        coordinates: [16.3731, 48.2125]
      },
      properties: {
        TYP_NUM: 1,
        ADRESSE: "Votivpark, 1090 Wien",
        BEZIRK: "9",
        BEMERKUNG: "Grundwasserbrunnen",
        OBJECTID: 3
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [16.3550, 48.1995]
      },
      properties: {
        TYP_NUM: 3,
        ADRESSE: "Resselpark, 1040 Wien", 
        BEZIRK: "4",
        BEMERKUNG: "Spielbrunnen für Kinder",
        OBJECTID: 4
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [16.3900, 48.2150]
      },
      properties: {
        TYP_NUM: 5,
        ADRESSE: "Augarten, 1020 Wien",
        BEZIRK: "2", 
        BEMERKUNG: "Trinkbrunnen mit Tränke",
        OBJECTID: 5
      }
    }
  ]
};

export const useTrinkbrunnen = (): UseTrinkbrunnenReturn => {
  const [fountains, setFountains] = useState<MapMarker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFountains = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data: TrinkbrunnenData;
      
      try {
        const response = await fetch(VIENNA_FOUNTAIN_API);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        data = await response.json();
      } catch (apiError) {
        console.warn('Failed to fetch from Vienna API, using sample data:', apiError);
        // Use sample data as fallback
        data = SAMPLE_FOUNTAIN_DATA;
      }
      
      const transformedFountains: MapMarker[] = data.features.map((feature) => {
        // Swap coordinates: GeoJSON is [longitude, latitude], Leaflet expects [latitude, longitude]
        const [longitude, latitude] = feature.geometry.coordinates;
        
        const fountainType = feature.properties.TYP_NUM;
        const fountainConfig = FOUNTAIN_TYPES[fountainType];
        
        return {
          id: `fountain-${feature.properties.OBJECTID}`,
          position: [latitude, longitude] as [number, number],
          title: fountainConfig?.name || `Trinkbrunnen (Typ ${fountainType})`,
          description: feature.properties.BEMERKUNG || 'Öffentlicher Trinkbrunnen',
          type: 'fountain' as const,
          category: 'water',
          fountainType: fountainType,
          address: feature.properties.ADRESSE,
          district: feature.properties.BEZIRK,
          notes: feature.properties.BEMERKUNG,
        };
      });
      
      setFountains(transformedFountains);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch fountain data';
      setError(errorMessage);
      console.error('Error fetching fountains:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchFountains();
  };

  useEffect(() => {
    fetchFountains();
  }, []);

  return {
    fountains,
    loading,
    error,
    refetch,
  };
};