// import React from "react";
// import { View, Text, StyleSheet, Pressable } from "react-native";
// import {  Stack } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function CompanyIndex() {
//   return (
//     <>
//       <Stack.Screen
//         options={{
//           title: "Company Dashboard",
//           headerStyle: { backgroundColor: "#7B4DDB" },
//           headerTintColor: "#FFFFFF",
//           headerTitleAlign: "center",
//           headerShadowVisible: false,
//         }}
//       />
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome, Company!</Text>
//         <Text style={styles.subtitle}>
//           Manage your profile, services, and monitor reports all in one place.
//         </Text>

//         <View style={styles.buttonsRow}>
//           <Pressable style={styles.cardButton}>
//             <Ionicons name="person-outline" size={30} color="#7B4DDB" />
//             <Text style={styles.cardText}>Profile</Text>
            
//           </Pressable>

//           <Pressable style={styles.cardButton}>
//             <Ionicons name="shield-checkmark-outline" size={30} color="#7B4DDB" />
//             <Text style={styles.cardText}>Services</Text>
//           </Pressable>

//           <Pressable style={styles.cardButton}>
//             <Ionicons name="document-text-outline" size={30} color="#7B4DDB" />
//             <Text style={styles.cardText}>Reports</Text>
//           </Pressable>
//         </View>
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F4F0FF",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   welcome: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#2D2340",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#4B4560",
//     textAlign: "center",
//     marginBottom: 40,
//     lineHeight: 22,
//   },
//   buttonsRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//   },
//   cardButton: {
//     backgroundColor: "#FFFFFF",
//     width: 100,
//     height: 120,
//     borderRadius: 16,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 },
//     marginHorizontal: 8,
//   },
//   cardText: {
//     marginTop: 10,
//     fontSize: 14,
//     fontWeight: "600",
//     textAlign: "center",
//     color: "#2D2340",
//   },
// });import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image 

} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { auth, db } from "@/services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import StorageService from "@/services/StorageService";
import { UsersService } from "@/services/UsersService";
export default function CompanyIndex() {
  const router = useRouter();
 const [companyName, setCompanyName] = useState("Company");

useEffect(() => {
  const loadCompanyName = async () => {
    try {
      const storedUser = await StorageService.getUser();

      if (!storedUser?.uid) {
        setCompanyName("Company");
        return;
      }

      const firebaseData: any = await UsersService.getUserProfile(storedUser.uid);

      if (!firebaseData) {
        setCompanyName("Company");
        return;
      }

      const name =
        firebaseData.companyName?.trim() ||
        firebaseData.organizationName?.trim() ||
        firebaseData.name?.trim() ||
        firebaseData.fullName?.trim() ||
        "";

      setCompanyName(name.length > 0 ? name : "Company");
    } catch (error) {
      console.log("Load company name error:", error);
      setCompanyName("Company");
    }
  };

  loadCompanyName();
}, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topCircle} />
        <View style={styles.smallCircle} />

        <View style={styles.logoBox}>
          {/* <Ionicons name="shield-checkmark" size={48} color="#FFFFFF" /> */}
           <Image
           source={require("../../assets/images/android-icon-background1.png")}
           style={styles.safeImage}
           resizeMode="contain"
          />
        </View>

        <Text style={styles.welcome}>Welcome {companyName} Company</Text>
       

        <Text style={styles.subtitle}>
          Thank you for being part of a safer community. You can review reports,
          support users, and manage your services from here.
        </Text>

        <View style={styles.infoCard}>
          <View style={styles.infoIconBox}>
            <Ionicons name="heart-outline" size={24} color="#8A1538" />
          </View>

          <View style={styles.infoTextBox}>
            <Text style={styles.infoTitle}>Your role matters</Text>
            <Text style={styles.infoText}>
              Handle every report with care, privacy, and responsibility.
            </Text>
          </View>
        </View>

        {/* <Pressable
          style={styles.mainButton}
          onPress={() => router.push("/companyTabs/CasesList")}
        >
          <Text style={styles.mainButtonText}>View Reports</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </Pressable> */}

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF7FA",
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 120,
    alignItems: "center",
    justifyContent: "center",
  },
safeImage: {
  width: 80,
  height: 80,
},
  topCircle: {
    position: "absolute",
    top: -90,
    right: -80,
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "#F5C6D6",
    opacity: 0.65,
  },

  smallCircle: {
    position: "absolute",
    bottom: 90,
    left: -55,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#101B3D",
    opacity: 0.08,
  },

  logoBox: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#101B3D",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,

    shadowColor: "#101B3D",
    shadowOpacity: 0.22,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },

  welcome: {
    fontSize: 31,
    fontWeight: "900",
    color: "#101B3D",
    textAlign: "center",
    marginBottom: 14,
  },

  subtitle: {
    fontSize: 16,
    color: "#5E6478",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 34,
    paddingHorizontal: 4,
  },

  infoCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,

    shadowColor: "#101B3D",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },

  infoIconBox: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#FFE6EF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  infoTextBox: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#101B3D",
    marginBottom: 4,
  },

  infoText: {
    fontSize: 13,
    color: "#6D7080",
    lineHeight: 18,
  },

  mainButton: {
    width: "100%",
    height: 56,
    borderRadius: 18,
    backgroundColor: "#8A1538",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,

    shadowColor: "#8A1538",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  secondaryButton: {
    width: "100%",
    height: 54,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F3CBD8",
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  secondaryButtonText: {
    color: "#101B3D",
    fontSize: 15,
    fontWeight: "800",
  },
});