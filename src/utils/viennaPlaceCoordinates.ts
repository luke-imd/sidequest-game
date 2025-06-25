import type { Place } from '../data/viennaPlaces';
import type { MapMarker } from '../types/map';

// Approximate coordinates for Vienna places
const placeCoordinates: Record<string, [number, number]> = {
  "1": [48.2082, 16.3738], // Stephansdom
  "2": [48.1847, 16.3122], // Schönbrunn Palace
  "3": [48.1916, 16.3816], // Belvedere
  "4": [48.1985, 16.3665], // Naschmarkt
  "5": [48.2166, 16.3951], // Prater
  "6": [48.2034, 16.3617], // Kunsthistorisches Museum
  "7": [48.2071, 16.3947], // Hundertwasserhaus
  "8": [48.2108, 16.3693], // Café Central
  "9": [48.2006, 16.3728], // Musikverein
  "10": [48.2392, 16.4123], // Donauinsel
  "11": [48.1979, 16.3713], // Karlskirche
  "12": [48.2058, 16.3781], // Stadtpark
};

export const convertPlacesToMarkers = (places: Place[]): MapMarker[] => {
  return places.map((place) => ({
    id: `place-${place.id}`,
    position: placeCoordinates[place.id] || [48.2082, 16.3738],
    title: place.name,
    description: place.description,
    type: 'official' as const,
    category: place.category,
    address: place.address,
    district: place.district,
  }));
};