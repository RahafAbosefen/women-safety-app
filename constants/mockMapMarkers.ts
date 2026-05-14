export type MapMarkerVariant = "danger" | "neutral" | "active";

export type MockMapMarker = {
  id: number;
  latitude: number;
  longitude: number;
  variant: MapMarkerVariant;
};

export const mockMapMarkers: MockMapMarker[] = [
  { id: 1, latitude: 31.501, longitude: 34.466, variant: "danger" },
  { id: 2, latitude: 31.498, longitude: 34.47, variant: "danger" },
  { id: 3, latitude: 31.512, longitude: 34.478, variant: "neutral" },
];
