export type MapMarkerVariant = "danger" | "neutral" | "active";

export type MockMapMarker = {
  id: number;
  latitude: number;
  longitude: number;
  variant: MapMarkerVariant;
};

export const mockMapMarkers: MockMapMarker[] = [
  { id: 1, latitude: 31.5075, longitude: 34.4715, variant: "danger" },
  { id: 2, latitude: 31.5035, longitude: 34.4745, variant: "danger" },
];
