import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import ReportButton from "@/components/map/report-button";
import ReportSheet from "@/components/map/report-sheet";
import SuccessSheet from "@/components/map/success-sheet";
import CustomMarker from "@/components/map/custom-marker";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import { mockMapMarkers } from "@/constants/mockMapMarkers";
import NotificationBell from "@/components/NotificationBell";
import { mapScreenStyles as styles } from "@/styles/Map.styles";

const DEFAULT_REGION = {
  latitude: 31.506,
  longitude: 34.472,
  latitudeDelta: 0.015,
  longitudeDelta: 0.015,
};

const MapScreen = () => {
  const [isReportVisible, setIsReportVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const mapRef = useRef<MapView | null>(null);
  const { location: userLocation, isLocationLoading } = useCurrentLocation();

  useEffect(() => {
    if (!userLocation) {
      return;
    }

    mapRef.current?.animateToRegion(
      {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: DEFAULT_REGION.latitudeDelta,
        longitudeDelta: DEFAULT_REGION.longitudeDelta,
      },
      1000,
    );
  }, [userLocation]);

  const handleOpenReport = () => {
    if (!userLocation) {
      return;
    }

    setIsReportVisible(true);
  };

  const handleSubmitReport = () => {
    setIsReportVisible(false);
    setIsSuccessVisible(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.headerRow}>
        <View style={styles.headerSide} />

        <Text style={styles.headerTitle}>Map</Text>

        <View style={styles.headerSide}>
          <NotificationBell />
        </View>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: userLocation?.latitude ?? DEFAULT_REGION.latitude,
            longitude: userLocation?.longitude ?? DEFAULT_REGION.longitude,
            latitudeDelta: DEFAULT_REGION.latitudeDelta,
            longitudeDelta: DEFAULT_REGION.longitudeDelta,
          }}
        >
          {mockMapMarkers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            >
              <CustomMarker variant={marker.variant} />
            </Marker>
          ))}

          {userLocation && (
            <Marker coordinate={userLocation}>
              <CustomMarker variant="active" />
            </Marker>
          )}
        </MapView>

        <ReportButton
          disabled={!userLocation || isLocationLoading}
          onPress={handleOpenReport}
        />
      </View>

      <ReportSheet
        isVisible={isReportVisible}
        location={userLocation}
        onClose={() => setIsReportVisible(false)}
        onSubmit={handleSubmitReport}
      />

      <SuccessSheet
        isVisible={isSuccessVisible}
        onBackToMap={() => setIsSuccessVisible(false)}
      />
    </SafeAreaView>
  );
};

export default MapScreen;
