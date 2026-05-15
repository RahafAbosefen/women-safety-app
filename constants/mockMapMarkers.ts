export type MapMarkerVariant = "danger" | "neutral" | "active";

export type MockMapMarker = {
  id: number;
  latitude: number;
  longitude: number;
  variant: MapMarkerVariant;
};

export const mockMapMarkers: MockMapMarker[] = [
  { id: 1, latitude: 32.2555, longitude: 35.1325, variant: "danger" },
  { id: 2, latitude: 32.2590, longitude: 35.1350, variant: "danger" },
  { id: 3, latitude: 32.2568, longitude: 35.1370, variant: "neutral" },
];
