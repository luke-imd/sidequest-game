export interface MapMarker {
  id: string;
  position: [number, number];
  title: string;
  description: string;
  type: 'official' | 'private';
  category?: string;
  createdBy?: string;
}

export interface MapLayer {
  id: string;
  name: string;
  markers: MapMarker[];
  visible: boolean;
  type: 'official' | 'private';
}