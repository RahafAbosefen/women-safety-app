import { View, StyleSheet , Text , Pressable } from 'react-native';
import { MapColors } from '@/constants/theme';


type ReportButtonProps={
    onPress:()=> void ;
    };

const ReportButton =({onPress}:ReportButtonProps)=>{
    return(
        <View style={styles.container}>
            <Pressable style={styles.button}onPress={onPress}>
                <Text style={styles.text}> Report from this location</Text>

            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 90 ,
        left: 20,
        right: 20,
    },
    button:  {
        backgroundColor: MapColors.primary,
        padding:16,
        borderRadius: 12,
        alignItems: 'center',

    },
    text:  {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
       
        
    },

});

export default  ReportButton;