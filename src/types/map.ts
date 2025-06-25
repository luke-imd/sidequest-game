export interface MapMarker {
  id: string;
  position: [number, number];
  title: string;
  description: string;
  type: 'official' | 'private' | 'fountain';
  category?: string;
  createdBy?: string;
  // Fountain-specific properties
  fountainType?: number;
  address?: string;
  district?: string;
  notes?: string;
}

export interface MapLayer {
  id: string;
  name: string;
  markers: MapMarker[];
  visible: boolean;
  type: 'official' | 'private';
}

export interface TrinkbrunnenData {
  type: string;
  features: TrinkbrunnenFeature[];
}

export interface TrinkbrunnenFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  properties: {
    TYP_NUM: number;
    ADRESSE: string;
    BEZIRK: string;
    BEMERKUNG: string;
    OBJECTID: number;
  };
}

export interface FountainTypeConfig {
  name: string;
  color: string;
  iconType: 'water' | 'paw' | 'fountain' | 'drink' | 'combined' | 'default';
}

export const FOUNTAIN_TYPES: Record<number, FountainTypeConfig> = {
  1: { name: 'Grundwasserbrunnen', color: '#0ea5e9', iconType: 'water' },
  2: { name: 'Hundetrinkbrunnen', color: '#f59e0b', iconType: 'paw' },
  3: { name: 'Spielbrunnen', color: '#8b5cf6', iconType: 'fountain' },
  4: { name: 'Trinkbrunnen', color: '#10b981', iconType: 'drink' },
  5: { name: 'Trinkbrunnen mit Tränke', color: '#06b6d4', iconType: 'combined' },
  7: { name: 'Auslaufbrunnen', color: '#3b82f6', iconType: 'default' },
  9: { name: 'Sommerspritzer', color: '#f43f5e', iconType: 'default' },
  10: { name: 'Trinkhydrant', color: '#ef4444', iconType: 'default' },
  11: { name: 'Sprühnebeldusche', color: '#a855f7', iconType: 'default' },
  12: { name: 'Bodenfontäne', color: '#6366f1', iconType: 'fountain' },
  13: { name: 'Wasserspielmöglichkeit', color: '#14b8a6', iconType: 'fountain' },
  14: { name: 'Mobiler Trinkbrunnen "Brunnhilde"', color: '#f97316', iconType: 'drink' },
  15: { name: 'Nebelstelen', color: '#84cc16', iconType: 'default' },
  16: { name: 'Schiff', color: '#0891b2', iconType: 'default' },
  17: { name: 'Auslaufbrunnen mit Tränke', color: '#0284c7', iconType: 'combined' },
  18: { name: 'Trinkhydrant mit Tränke', color: '#dc2626', iconType: 'combined' },
};