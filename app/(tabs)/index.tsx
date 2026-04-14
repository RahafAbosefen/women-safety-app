
// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Pressable } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import * as Location from "expo-location";
// import { Text, Modal, Portal, Button } from "react-native-paper";

// export default function HomeScreen() {
//   const [visible, setVisible] = useState(false);
//   const [resultVisible, setResultVisible] = useState(false);

//   const [count, setCount] = useState(5);
//   const [running, setRunning] = useState(false);
// const [location, setLocation] = useState<{
//   latitude: number;
//   longitude: number;
// } | null>(null);

//   useEffect(() => {
//   let subscription: Location.LocationSubscription | null = null;

//   (async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") return;

//     subscription = await Location.watchPositionAsync(
//       {
//         accuracy: Location.Accuracy.High,
//         timeInterval: 1000,
//         distanceInterval: 1,
//       },
//       (loc) => {
//         setLocation({
//           latitude: loc.coords.latitude,
//           longitude: loc.coords.longitude,
//         });
//       }
//     );
//   })();

//   return () => {
//     subscription?.remove();
//   };
// }, []);

//   useEffect(() => {
//     if (!running) return;

//     if (count <= 0) {
//       setVisible(false);
//       setRunning(false);

//       if (location) {
//         setTimeout(() => {
//           setResultVisible(true);
//         }, 200);
//       } else {
//        alert("Couldn't get location!");
//       }

//       return;
//     }

//     const interval = setInterval(() => {
//       setCount((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [running, count, location]);

//   const startSOS = () => {
//     setCount(5);
//     setRunning(true);
//     setVisible(true);
//   };

//   const cancelSOS = () => {
//     setVisible(false);
//     setRunning(false);

//     requestAnimationFrame(() => {
//       alert("SOS has been cancelled");
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.mainTitle}>
//         Do you feel unsafe right now?
//       </Text>
//       <Text style={styles.helperText}>Hold to send SOS alert</Text>


//       <Pressable style={styles.sosButton} onPress={startSOS}>
//         <Text style={styles.sosText}>SOS</Text>
//       </Pressable>

            
          
           
         
//          <Text style={styles.locationInfo}>
//             Your location will be shared automatically
//           </Text>
//           <Text style={styles.safeText}>You are currently safe</Text>


//       <Portal>
//         <Modal visible={visible} contentContainerStyle={styles.modal}>
//           <Text style={styles.modalTitle}>
//             Sending SOS...
//           </Text>

//           <View style={styles.circle}>
//             <Text style={styles.number}>{count}</Text>
//           </View>

//           <Button mode="outlined" onPress={cancelSOS} textColor="#fff">
//             Cancel
//           </Button>
//         </Modal>

        
//         <Modal
//           visible={resultVisible}
//           onDismiss={() => setResultVisible(false)}
//           contentContainerStyle={styles.resultModal}
//         >
//           <Text style={styles.resultTitle}>Emergency alert sent</Text>

//           <View style={styles.resultCircle}>
//             <Text style={styles.checkIcon}>✓</Text>
//           </View>

//           <Text style={styles.resultSubtitle}>Help is on the way</Text>

//           <Button
//             mode="contained"
//             onPress={() => setResultVisible(false)}
//             style={styles.backButton}
//             contentStyle={styles.backButtonContent}
//             labelStyle={styles.backButtonLabel}
//           >
//             Back to home
//           </Button>
//         </Modal>
//       </Portal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//  mainTitle: {
//     fontSize: 26,
//     fontWeight: "600",
//     color: "#111",
//     textAlign: "center",
//     marginBottom: 10,
  
//   },

//   helperText: {
//     marginTop:20,
//     fontSize: 16,
//     color: "#9A6A70",
   
//   },

// sosButton: {
//   width: 150,
//   height: 150,
//   borderRadius: 75,
//   backgroundColor: "#a62020",
//   justifyContent: "center",
//   alignItems: "center",
//   marginTop: 30,
//   shadowColor: "#000",
// shadowOffset: { width: 0, height: 4 },
// shadowOpacity: 0.3,
// shadowRadius: 6,
// elevation: 6,
// },

// sosText: {
//   fontSize: 36,
//   color: "#fff",
//   fontWeight: "bold",
// },

//   locationInfo: {
//     fontSize: 15,
//     color: "#9A6A70",
//     textAlign: "center",
//     marginBottom: 10,
//     marginTop:25
//   },
//   safeText: {
//     fontSize: 14,
//     color: "#9A6A70",
//     textAlign: "center",
//   },
//   // modal: {
//   //   backgroundColor: "rgba(127,29,29,0.85)",
//   //   width: 300,
//   //   height: 300,
//   //   alignSelf: "center",
//   //   borderRadius: 20,
//   //   padding: 20,
//   //   alignItems: "center",
//   //   justifyContent: "center",
//   // },
//   modal: {
//     width: 300,
//     alignSelf: "center",
//     backgroundColor: "rgba(127,29,29,0.88)",
//     borderRadius: 20,
//     padding: 24,
//     alignItems: "center",
//   },

//   modalTitle: {
//     color: "#fff",
//     fontSize: 22,
//     marginBottom: 15,
//     fontWeight: "bold",
//   },

//   circle: {
//     width: 180,
//     height: 180,
//     borderRadius: 90,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 12,
//     borderColor: "#b91c1c",
//     marginVertical: 20,
//   },

//   number: {
//     fontSize: 45,
//     fontWeight: "bold",
//     color: "#dc2626",
//   },

//   resultModal: {
//   backgroundColor: "#e8d6d1",        
//   borderRadius: 16,                 
//   padding: 20,                      
//   width: 300,                         
//   alignSelf: "center",             
//   justifyContent: "center",         
//   alignItems: "center",
//   shadowColor: "#000",               
//   shadowOffset: { width: 0, height: 2 },
//   shadowOpacity: 0.25,
//   shadowRadius: 4,
//   elevation: 5,                   
// },
// resultCircle: {
//   width: 120,
//   height: 120,
//   borderRadius: 60,
//   borderColor: "#1f4b63",
//   backgroundColor: "#f5f5f5",
//    borderWidth: 5,
//   justifyContent: "center",
//   alignItems: "center",
//   marginBottom: 15,
// },
// checkIcon: {
//   fontSize: 60,
//   color: "#1f4b63",
//   fontWeight: "bold",
// },
// resultTitle: {
//   fontSize: 20,
//   color: "#1f4b63",
//   fontWeight: "600",
//   textAlign: "center",
//   marginBottom: 10,
// },
// resultSubtitle: {
//   fontSize: 16,
//   color: "#6b7280",
//   textAlign: "center",
//   marginBottom: 20,
// },
// backButton: {
//   backgroundColor: "#1f4b63",
//   borderRadius: 12,
//   width: 160,
// },
// backButtonContent: {
//   height: 48,
// },
// backButtonLabel: {
//   color: "#fff",
//   fontSize: 16,
// },
// });

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { Text, Portal } from "react-native-paper";

import SOSButton from "@/components/SOSButton";
import SendingSOSModal from "@/components/SendingSOSModal";
import ResultSOSModal from "@/components/ResultSOSModal";

export default function HomeScreen() {
  const [visible, setVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [count, setCount] = useState(5);
  const [running, setRunning] = useState(false);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (loc) => {
          setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
        }
      );
    })();

    return () => {
      subscription?.remove();
    };
  }, []);

  useEffect(() => {
    if (!running) return;

    if (count <= 0) {
      setVisible(false);
      setRunning(false);

      if (location) {
        setTimeout(() => {
          setResultVisible(true);
        }, 200);
      } else {
        Alert.alert("Couldn't get location!");
      }

      return;
    }

    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running, count, location]);

  const startSOS = () => {
    setCount(5);
    setRunning(true);
    setVisible(true);
  };

  const cancelSOS = () => {
    setVisible(false);
    setRunning(false);

    requestAnimationFrame(() => {
      alert("SOS has been cancelled");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Do you feel unsafe right now?</Text>
      <Text style={styles.helperText}>Hold to send SOS alert</Text>

      <SOSButton onPress={startSOS} />

      <Text style={styles.locationInfo}>
        Your location will be shared automatically
      </Text>
      <Text style={styles.safeText}>You are currently safe</Text>

      <Portal>
        <SendingSOSModal
          visible={visible}
          count={count}
          onCancel={cancelSOS}
        />

        <ResultSOSModal
          visible={resultVisible}
          onDismiss={() => setResultVisible(false)}
        />
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "600",
    color: "#111",
    textAlign: "center",
    marginBottom: 10,
  },
  helperText: {
    marginTop: 20,
    fontSize: 16,
    color: "#9A6A70",
  },
  locationInfo: {
    fontSize: 15,
    color: "#9A6A70",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 25,
  },
  safeText: {
    fontSize: 14,
    color: "#9A6A70",
    textAlign: "center",
  },
});