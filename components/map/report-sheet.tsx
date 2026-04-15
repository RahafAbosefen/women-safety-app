import React, { useState } from 'react';
import { MapColors } from '@/constants/theme';
import { View,
     StyleSheet,
      Text,
       Pressable,
        TextInput,
        KeyboardAvoidingView,
        Platform,
   Modal,  
} from 'react-native';



type ReportSheetProps={
    isVisible: boolean;
    onClose:()=> void ;
    onSubmit:()=> void ;
    };

const ReportSheet =({isVisible, onSubmit, onClose }: ReportSheetProps)=>{
    //const [SelectIncident , setSelectIncident]=useState('');
    return(
        <Modal visible={isVisible} animationType='slide' transparent onRequestClose={onClose}>
            <KeyboardAvoidingView
              style={{flex:1}}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
               <Pressable style={styles.overlay}onPress={onClose}>
                 <Pressable style={styles.sheet}onPress={()=>{}}>
           
                <Text style={styles.title}> Report from this location</Text>

                <View style={styles.dropdown}>
                   <Text style={styles.placeholder}> Incident Type *</Text>
                </View> 
                <Text style={styles.hint}> Select the type that best describes the incident</Text> 

               <TextInput style={styles.input} placeholder= "Share details if you feel comfortable"multiline/>

               
               <Text style={styles.evidence}>Add evidence (optional)</Text>
               <View style={styles.evidenceRow}>
                 <Pressable style={styles.evidenceBtn}>
                    <Text> photo </Text>
                 </Pressable>
                 <Pressable style={styles.evidenceBtn}>
                    <Text> Audio </Text>
                 </Pressable>
               </View>



               <Pressable onPress={onSubmit} style={({pressed})=>[styles.submitBtn,pressed && styles.submitBtnPressed]} >
                    <Text style={styles.submitText}>Submit Report  </Text>
                 </Pressable>
           
            </Pressable>
            </Pressable>
        </KeyboardAvoidingView>
        </Modal>
       
    );
};


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end' ,
        backgroundColor: 'rgba(0,0,0,0.3)',
        
    },
    sheet:  {
        backgroundColor: MapColors.sheetBackground,
        padding:24,
        borderTopLeftRadius: 20,
        borderTopRightRadius:20,
        alignItems: 'center',
        width:'100%',

    },
    title:  {
        color: MapColors.primary,
        fontSize: 18,
        fontWeight: '600',
        textAlign:'center',
        marginBottom:16 ,
       
    },
    dropdown:  {
        borderWidth:1,
        padding:14,
        borderColor:'#E0E0E0',
        borderRadius: 8,
        marginBottom: 8,
        width:'100%',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',

    },
    placeholder:  {
        color: '#9E9E9E',
    },
    hint: { 
        fontSize: 12,
        color: '#9E9E9E',
        marginBottom:12 ,
        width:'100%',
       
    },
    input:  {
        borderWidth:1,
        padding:14,
        borderColor:'#E0E0E0',
        borderRadius: 8,
        marginBottom: 16,
        height:100,
        textAlignVertical:'top',
        width:'100%',
    },
    evidence: { 
        textAlign: 'center',
        color: '#9E9E9E',
        marginBottom:12 ,
       
    },
    evidenceRow: { 
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom:16 ,
        gap: 12,
       
    },
    evidenceBtn:  {
        borderWidth:1,
        padding:10,
        borderColor:MapColors.primary,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal:20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    submitBtn:  {
       backgroundColor:MapColors.submitButton,
        padding:16,
        borderRadius: 12,
        alignItems:'center',
        width:'100%',
    },
    submitText:  {
        color: '#FFFFFF',
        fontWeight:'600',
    },
    submitBtnPressed:{
     backgroundColor:MapColors.primary,
     opacity:0.9,   
    },
});

export default  ReportSheet;