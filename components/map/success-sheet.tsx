import { View, StyleSheet , Text, Pressable,  Modal } from 'react-native';
import { MapColors } from '@/constants/theme';


type SuccessSheetProps={
    isVisible: boolean;
    onBackToMap:()=> void ;
    };

const SuccessSheet =({isVisible, onBackToMap }: SuccessSheetProps)=> {
    return(
        <Modal visible={isVisible} animationType='slide' transparent  onRequestClose = {onBackToMap}>
        <View style={styles.overlay}>
            <View style={styles.sheet}>
                <View style={styles.iconCircle}>
                <Text style={styles.checkmark}> ✓ </Text>
             </View> 

             <Text style={styles.title}> Report submitted successfully </Text>
             <Text style={styles.subtitle}> Your report has been received and shared with the relevant authorities 
                </Text>
             <Text style={styles.support}>We are here to support you  </Text>
             <Pressable style={({pressed})=>[
                styles.button,
                pressed && styles.buttonPressed,
             ]} onPress={onBackToMap}>
                <Text style={styles.buttonText}> Back to map  </Text>
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
              backgroundColor: MapColors.overlayBackground,
              
          },
          sheet:  {
              backgroundColor: MapColors.sheetBackground,
              padding:24,
              borderTopLeftRadius: 20,
              borderTopRightRadius:20,
              alignItems: 'center',
      
          },
          title:  {
            color: MapColors.primary,
            fontSize: 18,
            fontWeight: '600',
            textAlign:'center',
            marginBottom:12 ,
       
    },
          iconCircle:  {
              borderColor: MapColors.primary,
              width: 80,
              height: 80,
              borderRadius:40,
              borderWidth:2,
              justifyContent: 'center',
              alignItems:'center',
              marginBottom:16 ,
             
          },
         checkmark: { 
              fontSize: 32,
              color: MapColors.primary,
            
             
          },
          subtitle: { 
              textAlign: 'center',
              color: MapColors.mutedText,
              marginBottom:12 ,
             
          },
          support: { 
              color: MapColors.supportText,
              marginBottom:24 ,
             
          },
         button:  {
              width:'100%',
              padding:16,
              backgroundColor:MapColors.primary,
              borderRadius: 12,
              alignItems:'center',
         
          },
          buttonText:  {
              color: MapColors.sheetBackground,
              fontWeight:'600',
          },
          buttonPressed:{
            opacity:0.8,
          },
      });
      
      export default  SuccessSheet;