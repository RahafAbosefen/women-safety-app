import { View, StyleSheet , Text, Pressable, TextInput, Modal } from 'react-native';
import { MapColors } from '@/constants/theme';
import { Overlay } from 'react-native-maps';
import { title } from 'node:process';


type ReportSheetProps={
    isVisible: boolean;
    onClose:()=> void ;
    onSubmit:()=> void ;
    };

const ReportSheet =({isVisible, onSubmit, onClose }: ReportSheetProps)=>{
    return(
        <Modal visible={isVisible} animationType='slide' transparent>
        <View style={styles.overlay}>
            <View style={styles.sheet}>
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



               <Pressable style={styles.submitBtn} onPress={onSubmit}>
                    <Text style={styles.submitText}>Submit Report  </Text>
                 </Pressable>
            </View>
        </View>
        </Modal>
       
    );
};


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end' ,
        backgroundColor: 'rgba(0,0,0,0.3)',
        right: 20,
    },
    sheet:  {
        backgroundColor: MapColors.sheetBackground,
        padding:24,
        borderTopLeftRadius: 20,
        borderTopRightRadius:20,

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

    },
    placeholder:  {
        color: '#9E9E9E',
    },
    hint: { 
        fontSize: 12,
        color: '#9E9E9E',
        marginBottom:12 ,
       
    },
    input:  {
        borderWidth:1,
        padding:14,
        borderColor:'#E0E0E0',
        borderRadius: 8,
        marginBottom: 16,
        height:100,
        textAlignVertical:'top',
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
    },
    submitBtn:  {
       backgroundColor:MapColors.submitButton,
        padding:16,
        borderRadius: 12,
        alignItems:'center',
    },
    submitText:  {
        color: '#FFFFFF',
        fontWeight:'600',
    },
});

export default  ReportSheet;