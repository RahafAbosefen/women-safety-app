
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { MapColors } from '@/constants/theme';
import ReportButton from '@/components/map/report-button';
import ReportSheet from '@/components/map/report-sheet';
import SuccessSheet from '@/components/map/success-sheet';
import CustomMarker from '@/components/map/custom-marker';

const MapScreen = () => {
  const [isReportVisible, setIsReportVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationError, setLocationError] = useState('');

  const mockMarkers = [
    { id: 1, latitude: 31.501, longitude: 34.466, variant: 'danger' },
    { id: 2, latitude: 31.498, longitude: 34.470, variant: 'danger' },
    { id: 3, latitude: 31.512, longitude: 34.478, variant: 'neutral' },
    { id: 4, latitude: 31.506, longitude: 34.472, variant: 'active' },
  ];

  const getLocation = async () => {
    try {
      setLocationError('');

      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        setLocationError('Location service is turned off');
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Location permission denied');
        return;
      }

      const lastKnown = await Location.getLastKnownPositionAsync();

      if (lastKnown) {
        setUserLocation({
          latitude: lastKnown.coords.latitude,
          longitude: lastKnown.coords.longitude,
        });
      }

      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setUserLocation({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      });
    } catch (error) {
      setLocationError('Could not get location');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleSubmit = () => {
    if (!userLocation) {
      setLocationError('Location is not ready yet');
      return;
    }

    setIsReportVisible(false);
    setIsSuccessVisible(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation?.latitude ?? 31.506,
          longitude: userLocation?.longitude ?? 34.472,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
      >
        {mockMarkers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          >
            <CustomMarker
              variant={marker.variant as 'danger' | 'neutral' | 'active'}
            />
          </Marker>
        ))}

        {userLocation && (
          <Marker coordinate={userLocation} title="Your location" />
        )}
      </MapView>

      <ReportButton onPress={() => setIsReportVisible(true)} />
      <ReportSheet
  isVisible={isReportVisible}
  onClose={() => setIsReportVisible(false)}
  onSubmit={handleSubmit}
/>

      <SuccessSheet
        isVisible={isSuccessVisible}
        onBackToMap={() => setIsSuccessVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MapColors.pageBackground,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;