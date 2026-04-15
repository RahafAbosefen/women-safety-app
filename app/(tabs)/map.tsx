import { View, StyleSheet } from 'react-native';
import {SafeAreaView } from 'react-native-safe-area-context';
import MapView , { Marker } from 'react-native-maps';
import { useState } from 'react';
import { MapColors } from '@/constants/theme';
import ReportButton from '@/components/map/report-button';
import ReportSheet from '@/components/map/report-sheet';
import SuccessSheet from '@/components/map/success-sheet';



 const MapScreen = () => {
    const [isReportVisible, setIsReportVisible] = useState(false);
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);


    const handleSubmit = () => {
        setIsReportVisible(false);
        setIsSuccessVisible(true);
    };


    return (
        <SafeAreaView style={styles.container}>
            <MapView style={styles.map}/>
            <ReportButton onPress={ ()=> setIsReportVisible(true)}/>
                <ReportSheet 
                isVisible={isReportVisible}
                onClose={()=>setIsReportVisible(false)}
                onSubmit={handleSubmit}
                />
                <SuccessSheet 
                isVisible={isSuccessVisible}
                onBackToMap={()=> setIsSuccessVisible(false)}
                />
           
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:MapColors.pageBackground,
    },
    map:{
        flex: 1,
    },

});

export default  MapScreen;