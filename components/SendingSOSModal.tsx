import React from "react";
import { View, StyleSheet } from "react-native";
import { Circle } from "react-native-maps";
import { Modal, Text, Button } from "react-native-paper";

type SendingSOSModalProps={
  visible:boolean;
  count:number;
  onCancel:()=>void;
};
export default function SendingSOSModal({ visible, count ,onCancel}:SendingSOSModalProps){
  return(
<Modal visible={visible} contentContainerStyle={styles.modal}>
  
  <Text style={styles.modalTitle} >Sending SOS...</Text>
<View style={styles.circle}>
  <Text style={styles.number}>{count}</Text>
</View>
<Button mode="outlined" onPress={onCancel} textColor="#fff" >
  Cancel
</Button>
</Modal>
  );
}

const styles=StyleSheet.create({
  modal:{
    width:300,
    alignSelf:"center",
    backgroundColor:"rgba(127,29,29,0.88)",
    borderRadius:20,
    padding:24,
    alignItems:"center"
  },
  modalTitle:{
    color:"#fff",
    fontSize:22,
    marginBottom:15,
    fontWeight:"bold"

  },
  circle:{
    width:180,
    height:180,
    borderRadius:90,
    backgroundColor:"#fff",
    justifyContent:"center",
    alignItems:"center",
    borderWidth:12,
    borderColor:"#b91c1c",
    marginVertical:20,
  },
  number:{
    fontSize:45,
    fontWeight:"bold",
    color:"#dc2626"
  }
})