
// //new
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Pressable,
//   Text,
//   ScrollView,
//   TextInput,
//   Alert,
//   Image,
// } from "react-native";
// import { RadioButton } from "react-native-paper";
// import { Ionicons, Feather } from "@expo/vector-icons";
// import * as Location from "expo-location";
// import * as ImagePicker from "expo-image-picker";
// import { Audio } from "expo-av";

// export default function ReportDropdown() {
//   const [open, setOpen] = useState(false);
//   const [reportType, setReportType] = useState("Harassment");
//   const [details, setDetails] = useState("");
//   const [location, setLocation] = useState<{
//     latitude: number;
//     longitude: number;
//   } | null>(null);
//   const [locationText, setLocationText] = useState(
//     "Current location (auto-detected)"
//   );

//   const [images, setImages] = useState<string[]>([]);

//   const [recording, setRecording] = useState<Audio.Recording | null>(null);
//   const [audioUri, setAudioUri] = useState<string | null>(null);
//   const [sound, setSound] = useState<Audio.Sound | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const [message, setMessage] = useState("");

//   const getLocation = async () => {
//     try {
//       const { status } = await Location.requestForegroundPermissionsAsync();

//       if (status !== "granted") {
//         setLocationText("Permission denied");
//         return;
//       }

//       const currentLocation = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = currentLocation.coords;

//       setLocation({ latitude, longitude });
//       setLocationText(
//         `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`
//       );
//     } catch (error) {
//       setLocationText("Error getting location");
//     }
//   };

//   const pickImage = async () => {
//     try {
//       const permission =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (!permission.granted) {
//         Alert.alert("Permission needed", "Please allow photo access.");
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: false,
//         quality: 0.8,
//         allowsMultipleSelection: true,
//       });

//       if (!result.canceled) {
//         const newImages = result.assets.map((img) => img.uri);
//         setImages((prev) => [...prev, ...newImages]);
//       }
//     } catch (error) {
//       console.log("Image picker error:", error);
//       Alert.alert("Error", "Could not pick image.");
//     }
//   };

//   const removeImage = (indexToRemove: number) => {
//     setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
//   };

//   const startRecording = async () => {
//     try {
//       const permission = await Audio.requestPermissionsAsync();

//       if (!permission.granted) {
//         Alert.alert("Permission needed", "Allow microphone access");
//         return;
//       }

//       if (sound) {
//         await sound.unloadAsync();
//         setSound(null);
//       }

//       setAudioUri(null);
//       setIsPlaying(false);

//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });

//       const { recording: newRecording } = await Audio.Recording.createAsync(
//         Audio.RecordingOptionsPresets.HIGH_QUALITY
//       );

//       setRecording(newRecording);
//       Alert.alert("Recording started");
//     } catch (err) {
//       console.log("Start recording error:", err);
//       Alert.alert("Error", "Could not start recording.");
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       if (!recording) return;

//       await recording.stopAndUnloadAsync();
//       const uri = recording.getURI();

//       setAudioUri(uri || null);
//       setRecording(null);

//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: false,
//         playsInSilentModeIOS: true,
//       });

//       Alert.alert("Recording saved");
//     } catch (err) {
//       console.log("Stop recording error:", err);
//       Alert.alert("Error", "Could not save recording.");
//     }
//   };

//   const playSound = async () => {
//     try {
//       if (!audioUri) return;

//       if (sound) {
//         await sound.unloadAsync();
//         setSound(null);
//       }

//       const { sound: newSound } = await Audio.Sound.createAsync(
//         { uri: audioUri },
//         { shouldPlay: true }
//       );

//       setSound(newSound);
//       setIsPlaying(true);

//       newSound.setOnPlaybackStatusUpdate((status: any) => {
//         if (status.didJustFinish) {
//           setIsPlaying(false);
//         }
//       });
//     } catch (error) {
//       console.log("Error playing sound:", error);
//       Alert.alert("Error", "Could not play audio.");
//     }
//   };

//   const deleteAudio = async () => {
//     try {
//       if (sound) {
//         await sound.unloadAsync();
//         setSound(null);
//       }

//       setAudioUri(null);
//       setRecording(null);
//       setIsPlaying(false);
//     } catch (error) {
//       console.log("Error deleting audio:", error);
//     }
//   };

//   const handleSubmit = async () => {
//     console.log("Submitted");
//     console.log("Type:", reportType);
//     console.log("Details:", details);
//     console.log("Location:", location);
//     console.log("Images:", images);
//     console.log("Audio:", audioUri);

//     setMessage("Report submitted successfully");

//     if (sound) {
//       await sound.unloadAsync();
//       setSound(null);
//     }

//     setReportType("Harassment");
//     setDetails("");
//     setLocation(null);
//     setLocationText("Current location (auto-detected)");
//     setImages([]);
//     setAudioUri(null);
//     setRecording(null);
//     setIsPlaying(false);
//     setOpen(false);
//   };

//   useEffect(() => {
//     return () => {
//       if (sound) {
//         sound.unloadAsync();
//       }
//     };
//   }, [sound]);

//   return (
//     <ScrollView
//       style={styles.screen}
//       contentContainerStyle={styles.scrollContent}
//       showsVerticalScrollIndicator={false}
//       keyboardShouldPersistTaps="handled"
//     >
//       <View style={styles.topSpace} />

//       <View style={styles.headerRow}>
//         <Text style={styles.headerTitle}>Report Details</Text>
//       </View>

//       <Pressable style={styles.dropdown} onPress={() => setOpen(!open)}>
//         <Text style={styles.dropdownText}>{reportType}</Text>
//         <Ionicons
//           name={open ? "chevron-up" : "chevron-down"}
//           size={22}
//           color="#2B5C73"
//         />
//       </Pressable>

//       {open && (
//         <View style={styles.menuBox}>
//           <RadioButton.Group
//             onValueChange={(value) => {
//               setReportType(value);
//               setOpen(false);
//             }}
//             value={reportType}
//           >
//             <Pressable
//               style={styles.item}
//               onPress={() => {
//                 setReportType("Harassment");
//                 setOpen(false);
//               }}
//             >
//               <RadioButton value="Harassment" />
//               <Text style={styles.itemText}>Harassment</Text>
//             </Pressable>

//             <Pressable
//               style={styles.item}
//               onPress={() => {
//                 setReportType("Physical violence");
//                 setOpen(false);
//               }}
//             >
//               <RadioButton value="Physical violence" />
//               <Text style={styles.itemText}>Physical violence</Text>
//             </Pressable>

//             <Pressable
//               style={styles.item}
//               onPress={() => {
//                 setReportType("Verbal abuse");
//                 setOpen(false);
//               }}
//             >
//               <RadioButton value="Verbal abuse" />
//               <Text style={styles.itemText}>Verbal abuse</Text>
//             </Pressable>
//           </RadioButton.Group>
//         </View>
//       )}

//       <TextInput
//         style={styles.detailsInput}
//         placeholder="Share details if you feel comfortable"
//         placeholderTextColor="#C39AA3"
//         multiline
//         value={details}
//         onChangeText={setDetails}
//         textAlignVertical="top"
//       />

//       <Pressable style={styles.locationBox} onPress={getLocation}>
//         <Ionicons name="location-outline" size={22} color="#204E64" />
//         <Text style={styles.locationText}>{locationText}</Text>
//       </Pressable>

//       <Text style={styles.evidenceTitle}>Add evidence (optional)</Text>

//       <View style={styles.buttonRow}>
//         <Pressable style={styles.smallButton} onPress={pickImage}>
//           <Feather name="image" size={18} color="#204E64" />
//           <Text style={styles.smallButtonText}>photo</Text>
//         </Pressable>

//         <Pressable
//           style={styles.smallButton}
//           onPress={recording ? stopRecording : startRecording}
//         >
//           <Feather name="mic" size={18} color="#204E64" />
//           <Text style={styles.smallButtonText}>
//             {recording ? "Stop" : "Audio"}
//           </Text>
//         </Pressable>
//       </View>

//       <View style={styles.imagesContainer}>
//         {images.map((uri, index) => (
//           <View key={`${uri}-${index}`} style={styles.imageWrapper}>
//             <Image source={{ uri }} style={styles.image} />
//             <Pressable
//               style={styles.deleteButton}
//               onPress={() => removeImage(index)}
//             >
//               <Text style={styles.deleteButtonText}>X</Text>
//             </Pressable>
//           </View>
//         ))}
//       </View>

//       {audioUri && (
//         <View style={styles.audioBox}>
//           <Pressable style={styles.audioPlayButton} onPress={playSound}>
//             <Ionicons
//               name={isPlaying ? "pause" : "play"}
//               size={18}
//               color="#fff"
//             />
//           </Pressable>

//           <Text style={styles.audioText}>Voice recording ready</Text>

//           <Pressable style={styles.audioDeleteButton} onPress={deleteAudio}>
//             <Ionicons name="close" size={16} color="#fff" />
//           </Pressable>
//         </View>
//       )}

//       {message ? <Text style={styles.successMessage}>{message}</Text> : null}

//       <Pressable style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.submitButtonText}>Submit Report</Text>
//       </Pressable>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: "#F8F8F8",
//   },
//   scrollContent: {
//     paddingHorizontal: 24,
//     paddingBottom: 120,
//   },
//   topSpace: {
//     height: 50,
//   },
//   headerRow: {
//     marginTop: 10,
//     alignItems: "center",
//     marginBottom: 34,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "600",
//     color: "#204E64",
//   },
//   dropdown: {
//     height: 58,
//     borderWidth: 1.5,
//     borderColor: "#B7C5CC",
//     borderRadius: 18,
//     backgroundColor: "#fff",
//     paddingHorizontal: 18,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   dropdownText: {
//     fontSize: 17,
//     color: "#496878",
//   },
//   menuBox: {
//     marginTop: 10,
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: "#E3E8EB",
//     paddingVertical: 10,
//     marginBottom: 16,
//   },
//   item: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//   },
//   itemText: {
//     fontSize: 16,
//     color: "#496878",
//   },
//   detailsInput: {
//     marginTop:20,
//     minHeight: 115,
//     borderWidth: 1.4,
//     borderColor: "#B8C7CF",
//     borderRadius: 15,
//     backgroundColor: "#fff",
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     fontSize: 16,
//     color: "#204E64",
//     marginBottom: 22,
//   },
//   locationBox: {
//     minHeight: 50,
//     borderWidth: 1.4,
//     borderColor: "#B8C7CF",
//     borderRadius: 15,
//     backgroundColor: "#fff",
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 28,
//   },
//   locationText: {
//     marginLeft: 8,
//     color: "#4F6B79",
//     fontSize: 15,
//     flex: 1,
//   },
//   evidenceTitle: {
//     textAlign: "center",
//     color: "#C49AA3",
//     fontSize: 16,
//     marginBottom: 18,
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 26,
//   },
//   smallButton: {
//     width: "42%",
//     height: 44,
//     borderWidth: 1.8,
//     borderColor: "#204E64",
//     borderRadius: 12,
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   smallButtonText: {
//     marginLeft: 8,
//     fontSize: 16,
//     color: "#204E64",
//     fontWeight: "500",
//   },
//   imagesContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 10,
//     marginBottom: 20,
//   },
//   imageWrapper: {
//     position: "relative",
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//   },
//   deleteButton: {
//     position: "absolute",
//     top: -5,
//     right: -5,
//     backgroundColor: "red",
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   deleteButtonText: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   audioBox: {
//     marginBottom: 20,
//     backgroundColor: "#fff",
//     borderWidth: 1.4,
//     borderColor: "#B8C7CF",
//     borderRadius: 14,
//     paddingVertical: 12,
//     paddingHorizontal: 14,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   audioPlayButton: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     backgroundColor: "#204E64",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   audioText: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 15,
//     color: "#204E64",
//   },
//   audioDeleteButton: {
//     width: 26,
//     height: 26,
//     borderRadius: 13,
//     backgroundColor: "#D9534F",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   successMessage: {
//     textAlign: "center",
//     color: "green",
//     fontSize: 16,
//     marginBottom: 12,
//   },
//   submitButton: {
//     alignSelf: "center",
//     backgroundColor: "#204E64",
//     borderRadius: 14,
//     paddingVertical: 15,
//     paddingHorizontal: 32,
//     marginTop: 4,
//   },
//   submitButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });


import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { RadioButton, TextInput } from "react-native-paper";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";

type ReportFormData = {
  details: string;
};

export default function AddReportScreen() {
  const [open, setOpen] = useState(false);
  const [reportType, setReportType] = useState("Harassment");

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [locationText, setLocationText] = useState(
    "Current location (auto-detected)"
  );

  const [images, setImages] = useState<string[]>([]);

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [message, setMessage] = useState("");

  const { control, handleSubmit, reset } = useForm<ReportFormData>({
    defaultValues: {
      details: "",
    },
  });

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationText("Permission denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      setLocation({ latitude, longitude });
      setLocationText(
        `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`
      );
    } catch (error) {
      setLocationText("Error getting location");
    }
  };

  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission needed", "Please allow photo access.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.8,
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        const newImages = result.assets.map((img) => img.uri);
        setImages((prev) => [...prev, ...newImages]);
      }
    } catch (error) {
      console.log("Image picker error:", error);
      Alert.alert("Error", "Could not pick image.");
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission needed", "Allow microphone access");
        return;
      }

      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      setAudioUri(null);
      setIsPlaying(false);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(newRecording);
      Alert.alert("Recording started");
    } catch (err) {
      console.log("Start recording error:", err);
      Alert.alert("Error", "Could not start recording.");
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      setAudioUri(uri || null);
      setRecording(null);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });

      Alert.alert("Recording saved");
    } catch (err) {
      console.log("Stop recording error:", err);
      Alert.alert("Error", "Could not save recording.");
    }
  };

  const playSound = async () => {
    try {
      if (!audioUri) return;

      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );

      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.log("Error playing sound:", error);
      Alert.alert("Error", "Could not play audio.");
    }
  };

  const deleteAudio = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      setAudioUri(null);
      setRecording(null);
      setIsPlaying(false);
    } catch (error) {
      console.log("Error deleting audio:", error);
    }
  };

  const onSubmit = async (data: ReportFormData) => {
    console.log("Submitted");
    console.log("Type:", reportType);
    console.log("Details:", data.details);
    console.log("Location:", location);
    console.log("Images:", images);
    console.log("Audio:", audioUri);

    setMessage("Report submitted successfully");

    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }

    setReportType("Harassment");
    reset({ details: "" });
    setLocation(null);
    setLocationText("Current location (auto-detected)");
    setImages([]);
    setAudioUri(null);
    setRecording(null);
    setIsPlaying(false);
    setOpen(false);
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.topSpace} />

      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Report Details</Text>
      </View>

      <Pressable style={styles.dropdown} onPress={() => setOpen(!open)}>
        <Text style={styles.dropdownText}>{reportType}</Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={22}
          color="#2B5C73"
        />
      </Pressable>

      {open && (
        <View style={styles.menuBox}>
          <RadioButton.Group
            onValueChange={(value) => {
              setReportType(value);
              setOpen(false);
            }}
            value={reportType}
          >
            <Pressable
              style={styles.item}
              onPress={() => {
                setReportType("Harassment");
                setOpen(false);
              }}
            >
              <RadioButton value="Harassment" />
              <Text style={styles.itemText}>Harassment</Text>
            </Pressable>

            <Pressable
              style={styles.item}
              onPress={() => {
                setReportType("Physical violence");
                setOpen(false);
              }}
            >
              <RadioButton value="Physical violence" />
              <Text style={styles.itemText}>Physical violence</Text>
            </Pressable>

            <Pressable
              style={styles.item}
              onPress={() => {
                setReportType("Verbal abuse");
                setOpen(false);
              }}
            >
              <RadioButton value="Verbal abuse" />
              <Text style={styles.itemText}>Verbal abuse</Text>
            </Pressable>
          </RadioButton.Group>
        </View>
      )}

      <Controller
        control={control}
        name="details"
        rules={{ required: false }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            mode="outlined"
            label="Details"
            placeholder="Share details if you feel comfortable"
            value={value}
            onChangeText={onChange}
            multiline
            outlineColor="#B8C7CF"
            activeOutlineColor="#204E64"
            style={styles.detailsInput}
            contentStyle={styles.detailsInputContent}
          />
        )}
      />

      <Pressable style={styles.locationBox} onPress={getLocation}>
        <Ionicons name="location-outline" size={22} color="#204E64" />
        <Text style={styles.locationText}>{locationText}</Text>
      </Pressable>

      <Text style={styles.evidenceTitle}>Add evidence (optional)</Text>

      <View style={styles.buttonRow}>
        <Pressable style={styles.smallButton} onPress={pickImage}>
          <Feather name="image" size={18} color="#204E64" />
          <Text style={styles.smallButtonText}>Photo</Text>
        </Pressable>

        <Pressable
          style={styles.smallButton}
          onPress={recording ? stopRecording : startRecording}
        >
          <Feather name="mic" size={18} color="#204E64" />
          <Text style={styles.smallButtonText}>
            {recording ? "Stop" : "Audio"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.imagesContainer}>
        {images.map((uri, index) => (
          <View key={`${uri}-${index}`} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.image} contentFit="cover" />
            <Pressable
              style={styles.deleteButton}
              onPress={() => removeImage(index)}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </Pressable>
          </View>
        ))}
      </View>

      {audioUri && (
        <View style={styles.audioBox}>
          <Pressable style={styles.audioPlayButton} onPress={playSound}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={18}
              color="#fff"
            />
          </Pressable>

          <Text style={styles.audioText}>Voice recording ready</Text>

          <Pressable style={styles.audioDeleteButton} onPress={deleteAudio}>
            <Ionicons name="close" size={16} color="#fff" />
          </Pressable>
        </View>
      )}

      {message ? <Text style={styles.successMessage}>{message}</Text> : null}

      <Pressable style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>Submit Report</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  topSpace: {
    height: 50,
  },
  headerRow: {
    marginTop: 10,
    alignItems: "center",
    marginBottom: 34,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#204E64",
  },
  dropdown: {
    height: 58,
    borderWidth: 1.5,
    borderColor: "#B7C5CC",
    borderRadius: 18,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 17,
    color: "#496878",
  },
  menuBox: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E3E8EB",
    paddingVertical: 10,
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#496878",
  },
  detailsInput: {
    marginTop: 20,
    backgroundColor: "#fff",
    marginBottom: 22,
  },
  detailsInputContent: {
    minHeight: 115,
    color: "#204E64",
  },
  locationBox: {
    minHeight: 50,
    borderWidth: 1.4,
    borderColor: "#B8C7CF",
    borderRadius: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },
  locationText: {
    marginLeft: 8,
    color: "#4F6B79",
    fontSize: 15,
    flex: 1,
  },
  evidenceTitle: {
    textAlign: "center",
    color: "#C49AA3",
    fontSize: 16,
    marginBottom: 18,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26,
  },
  smallButton: {
    width: "42%",
    height: 44,
    borderWidth: 1.8,
    borderColor: "#204E64",
    borderRadius: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  smallButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#204E64",
    fontWeight: "500",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  deleteButton: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  audioBox: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderWidth: 1.4,
    borderColor: "#B8C7CF",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  audioPlayButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#204E64",
    justifyContent: "center",
    alignItems: "center",
  },
  audioText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: "#204E64",
  },
  audioDeleteButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#D9534F",
    justifyContent: "center",
    alignItems: "center",
  },
  successMessage: {
    textAlign: "center",
    color: "green",
    fontSize: 16,
    marginBottom: 12,
  },
  submitButton: {
    alignSelf: "center",
    backgroundColor: "#204E64",
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 32,
    marginTop: 4,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});