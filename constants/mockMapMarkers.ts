export type MapMarkerVariant = "danger" | "neutral" | "active";

export type MockMapMarker = {
  id: number;
  latitude: number;
  longitude: number;
  variant: MapMarkerVariant;
};

export const mockMapMarkers: MockMapMarker[] = [
  { id: 1, latitude: 32.2495, longitude: 32.266, variant: "danger" },
  { id: 2, latitude: 35.126, longitude: 35.145, variant: "danger" },
];
