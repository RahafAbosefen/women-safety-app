import { useState, useEffect } from "react";
import * as Location from "expo-location";

export type LocationCoords = {
  latitude: number;
  longitude: number;
};

type UseCurrentLocationReturn = {
  location: LocationCoords | null;
  locationError: string | null;
  isLocationLoading: boolean;
  getLocation: () => Promise<void>;
};

const useCurrentLocation = (): UseCurrentLocationReturn => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState<boolean>(false);

  const getLocation = async () => {
    try {
      setIsLocationLoading(true);
      setLocationError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocation(null);
        setLocationError("Location permission denied ");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});

      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    } catch (error) {
      console.log(error);
      setLocationError("Could not get location  ");
    } finally {
      setIsLocationLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, locationError, isLocationLoading, getLocation };
};

export default useCurrentLocation;
