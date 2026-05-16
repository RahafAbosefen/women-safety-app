import { StyleSheet } from "react-native";
import { MapColors, AppColors } from "@/constants/theme";

export const mapScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },

  headerRow: {
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerSide: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,
    fontSize: 23,
    fontWeight: "900",
    color: MapColors.primary,
    textAlign: "center",
    letterSpacing: -0.4,
  },

  mapContainer: {
    flex: 1,
  },

  map: {
    flex: 1,
  },
});

export const reportSheetStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: MapColors.overlayBackground,
  },
  sheet: {
    backgroundColor: MapColors.sheetBackground,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 18,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    maxHeight: "88%",
  },
  sheetContent: {
    paddingBottom: 28,
  },
  title: {
    color: MapColors.primary,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  locationText: {
    fontSize: 13,
    color: MapColors.primary,
    marginBottom: 12,
    textAlign: "center",
  },
  hint: {
    fontSize: 12,
    color: MapColors.submitButton,
    marginBottom: 12,
    width: "100%",
  },
  errorHint: {
    color: AppColors.error,
  },
  input: {
    borderWidth: 1,
    padding: 14,
    borderColor: MapColors.pageBackground,
    borderRadius: 8,
    marginBottom: 8,
    minHeight: 100,
    textAlignVertical: "top",
    width: "100%",
    backgroundColor: MapColors.sheetBackground,
  },
  inputError: {
    borderColor: AppColors.error,
  },
  errorText: {
    width: "100%",
    fontSize: 12,
    color: AppColors.error,
    marginBottom: 16,
  },
  submitBtn: {
    backgroundColor: MapColors.submitButton,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    marginTop: 8,
  },
  submitBtnReady: {
    backgroundColor: MapColors.primary,
  },
  submitBtnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  submitBtnDisabled: {
    opacity: 0.7,
  },
  submitText: {
    color: MapColors.sheetBackground,
    fontWeight: "600",
    fontSize: 16,
  },
  evidenceLabel: {
    textAlign: "center",
    color: MapColors.supportText,
    marginBottom: 12,
  },
  evidenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 18,
  },

  evidenceRowWithAudio: {
    marginBottom: 105,
  },

  evidenceBtn: {
    flex: 1,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: MapColors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: MapColors.sheetBackground,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  evidenceBtnText: {
    color: MapColors.primary,
    fontSize: 16,
    fontWeight: "800",
  },
  evidenceBtnPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  reportImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: MapColors.pageBackground,
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
    justifyContent: "center",
  },
  imageBox: {
    width: 95,
    height: 95,
    borderRadius: 12,
    position: "relative",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  removeImageButton: {
    position: "absolute",
    top: -7,
    right: -7,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: AppColors.error,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const customMarkerStyles = StyleSheet.create({
  activeOuter: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: MapColors.primary,
    backgroundColor: MapColors.activeMarkerRingBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  activeInner: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 3,
    borderColor: MapColors.sheetBackground,
    backgroundColor: MapColors.primary,
  },
  markerBody: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  dangerMarker: {
    backgroundColor: MapColors.dangerMarker,
  },
  neutralMarker: {
    backgroundColor: MapColors.neutralMarker,
  },
  activeMarker: {
    backgroundColor: MapColors.primary,
  },
});

export const successSheetStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: MapColors.overlayBackground,
  },
  sheet: {
    backgroundColor: MapColors.sheetBackground,
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  title: {
    color: MapColors.primary,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
  },
  iconCircle: {
    borderColor: MapColors.primary,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  checkmark: {
    fontSize: 32,
    color: MapColors.primary,
  },
  subtitle: {
    textAlign: "center",
    color: MapColors.mutedText,
    marginBottom: 12,
  },
  support: {
    color: MapColors.supportText,
    marginBottom: 24,
  },
  button: {
    width: "100%",
    padding: 16,
    backgroundColor: MapColors.primary,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: MapColors.sheetBackground,
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.8,
  },
});

export const audioFeatureStyles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginBottom: 8,
  },

  mapContainer: {
    flex: 1,
    position: "relative",
    alignItems: "stretch",
    marginBottom: 0,
  },

  recordButton: {
    width: "60%",
    minHeight: 56,
    backgroundColor: "#204E64",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    elevation: 2,
  },

  stopButton: {
    width: "60%",
    minHeight: 56,
    backgroundColor: "#B1848D",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    elevation: 2,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },

  mapRecordButton: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: MapColors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: MapColors.sheetBackground,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  mapStopButton: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: MapColors.supportText,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: MapColors.supportText,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  mapButtonText: {
    color: MapColors.primary,
    fontSize: 16,
    fontWeight: "800",
  },

  mapStopButtonText: {
    color: MapColors.sheetBackground,
    fontSize: 16,
    fontWeight: "800",
  },

  audioCard: {
    marginTop: 14,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  mapAudioCard: {
    position: "absolute",
    top: 76,
    right: 0,
    width: "210%",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: MapColors.pageBackground,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },

  audioInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },

  audioText: {
    color: "#204E64",
    fontSize: 15,
    fontWeight: "700",
  },

  actions: {
    flexDirection: "row",
    gap: 8,
  },

  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#204E64",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#D9534F",
    alignItems: "center",
    justifyContent: "center",
  },
});
