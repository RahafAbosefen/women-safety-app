// import React from "react";
// import { View, StyleSheet } from "react-native";
// import { Circle } from "react-native-maps";
// import { Modal, Text, Button } from "react-native-paper";

// type SendingSOSModalProps={
//   visible:boolean;
//   count:number;
//   onCancel:()=>void;
// };
// export default function SendingSOSModal({ visible, count ,onCancel}:SendingSOSModalProps){
//   return(
// <Modal visible={visible} contentContainerStyle={styles.modal}>
  
//   <Text style={styles.modalTitle} >Sending SOS...</Text>
// <View style={styles.circle}>
//   <Text style={styles.number}>{count}</Text>
// </View>
// <Button mode="outlined" onPress={onCancel} textColor="#fff" >
//   Cancel
// </Button>
// </Modal>
//   );
// }

// const styles=StyleSheet.create({
//   modal:{
//     width:300,
//     alignSelf:"center",
//     backgroundColor:"rgba(127,29,29,0.88)",
//     borderRadius:20,
//     padding:24,
//     alignItems:"center"
//   },
//   modalTitle:{
//     color:"#fff",
//     fontSize:22,
//     marginBottom:15,
//     fontWeight:"bold"

//   },
//   circle:{
//     width:180,
//     height:180,
//     borderRadius:90,
//     backgroundColor:"#fff",
//     justifyContent:"center",
//     alignItems:"center",
//     borderWidth:12,
//     borderColor:"#b91c1c",
//     marginVertical:20,
//   },
//   number:{
//     fontSize:45,
//     fontWeight:"bold",
//     color:"#dc2626"
//   }
// })


import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type Props = {
  visible: boolean;
  count: number;
  onCancel: () => void;
};

export default function SendingSOSModal({ visible, count, onCancel }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Sending SOS...</Text>

          <View style={styles.countOuter}>
            <View style={styles.countInner}>
              <Text style={styles.countText}>{count}</Text>
            </View>
          </View>

          <Text style={styles.subtitle}>
            Your emergency alert will be sent automatically.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.cancelButton,
              pressed && styles.cancelButtonPressed,
            ]}
            onPress={onCancel}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(17, 24, 39, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  card: {
    width: "100%",
    maxWidth: 345,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    paddingTop: 34,
    paddingBottom: 28,
    paddingHorizontal: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0D8D4",
    elevation: 14,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 18,
  },

  title: {
    fontSize: 27,
    fontWeight: "900",
    color: "#204E64",
    textAlign: "center",
    marginBottom: 26,
  },

  countOuter: {
    // width: 190,
    // height: 190,
    // borderRadius: 95,
    // backgroundColor: "#FDE4E6",
    // alignItems: "center",
    // justifyContent: "center",
    // marginBottom: 24,
  },

  countInner: {
    width: 145,
    height: 145,
    borderRadius: 72.5,
    backgroundColor: "#FFFFFF",
    borderWidth: 8,
    borderColor: "#D94343",
    alignItems: "center",
    justifyContent: "center",
  },

  countText: {
    fontSize: 58,
    fontWeight: "900",
    color: "#D94343",
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7D86",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
    fontWeight: "600",
  },

  cancelButton: {
    width: "70%",
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: "#204E64",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },

  cancelText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
});