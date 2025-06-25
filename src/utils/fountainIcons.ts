import { Icon } from 'leaflet';
import type { FountainTypeConfig } from '../types/map';

// SVG icons as data URLs for different fountain types
const createSVGIcon = (color: string, symbol: string): string => {
  const svgContent = `<svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
    <path fill="${color}" stroke="#fff" stroke-width="2" d="M12.5 0C5.596 0 0 5.596 0 12.5c0 6.904 12.5 28.5 12.5 28.5s12.5-21.596 12.5-28.5C25 5.596 19.404 0 12.5 0z"/>
    <text x="12.5" y="16" text-anchor="middle" fill="white" font-size="10" font-family="Arial, sans-serif">${symbol}</text>
  </svg>`;
  
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
};

const iconSymbols = {
  water: '💧',
  paw: '🐾', 
  fountain: '⛲',
  drink: '🚰',
  combined: '🚰',
  default: '💧'
};

export const createFountainIcon = (config: FountainTypeConfig): Icon => {
  const symbol = iconSymbols[config.iconType];
  const iconUrl = createSVGIcon(config.color, symbol);
  
  return new Icon({
    iconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: undefined,
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
  });
};

// Create fallback icon for unknown fountain types
export const createDefaultFountainIcon = (color: string = '#3b82f6'): Icon => {
  const iconUrl = createSVGIcon(color, '💧');
  
  return new Icon({
    iconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: undefined,
    shadowSize: [41, 41],
    shadowAnchor: [12, 41]
  });
};