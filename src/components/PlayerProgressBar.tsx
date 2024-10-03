import { View, Text, ViewProps, StyleSheet } from 'react-native'
import React from 'react'
import TrackPlayer, { useProgress } from 'react-native-track-player'
import { useSharedValue } from 'react-native-reanimated';
import { Slider } from "react-native-awesome-slider";
import { formatSecondsToMinutes } from '@/helpers/miscellaneous';
import { colors, fontSizes } from '@/constants/tokens';
import { defaultStyles, utilsStyles } from '@/styles';

export const PlayerProgressBar = ({ style }: ViewProps) => {
    const { duration, position } = useProgress(250); // şunu ifade eder: 250ms'de bir güncelleme yap

    const isSliding = useSharedValue(false); // slider'ın kaydırılıp kaydırılmadığını kontrol eder
    const progress = useSharedValue(0); // slider'ın ilerleme durumunu kontrol eder
    const min = useSharedValue(0);  // slider'ın minimum değerini kontrol eder
    const max = useSharedValue(1); // slider'ın maksimum değerini kontrol eder

    const trackElapsedTime = formatSecondsToMinutes(position); // formatSecondsToMinutes fonksiyonu ile geçen süreyi dakika cinsinden gösterir
    const trackRemainingTime = formatSecondsToMinutes(duration - position); // formatSecondsToMinutes fonksiyonu ile kalan süreyi dakika cinsinden gösterir

    if (!isSliding.value) {
        progress.value = duration > 0 ? position / duration : 0; // slider'ın ilerleme durumunu kontrol eder
    }

    return (
        <View style={style}> 
            <Slider
                progress={progress}
                minimumValue={min}
                maximumValue={max}
                containerStyle={utilsStyles.slider}
                thumbWidth={0}
                renderBubble={() => null}
                theme={{
                    minimumTrackTintColor: colors.minimumTrackTintColor,
                    maximumTrackTintColor: colors.maximumTrackTintColor,
                }}
                onSlidingStart={() => isSliding.value = true}
                onValueChange={async (value) => {
                    await TrackPlayer.seekTo(value * duration);
                }}
                onSlidingComplete={async (value) => {
                    if (!isSliding.value) return;
                    isSliding.value = false;

                    await TrackPlayer.seekTo(value * duration);
                }}
            />

            <View style={styles.timeRow}>
                <Text style={styles.timeTxt}>{trackElapsedTime}</Text>
                <Text style={styles.timeTxt}>{'-'} {trackRemainingTime}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    timeTxt: {
        ...defaultStyles.text,
        color: colors.text,
        opacity: 0.7,
        fontSize: fontSizes.xs,
        letterSpacing: 0.7,
        fontWeight: '500'

    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginTop: 20,

    }
})

//          NOTLAR :


    //         <View style={style}> {/* style prop'unu alır */}
    //         <Slider
    //             progress={progress} // slider'ın ilerleme durumunu kontrol eder
    //             minimumValue={min} // slider'ın minimum değerini kontrol eder
    //             maximumValue={max} // slider'ın maksimum değerini kontrol eder
    //             containerStyle={utilsStyles.slider} // slider'ın stilini belirler
    //             thumbWidth={0} // slider'ın başlığını belirler
    //             renderBubble={() => null} // slider'ın baloncuklarını belirler
    //             theme={{
    //                 minimumTrackTintColor: colors.minimumTrackTintColor,
    //                 maximumTrackTintColor: colors.maximumTrackTintColor,
    //             }} // slider'ın temasını belirler
    //             onSlidingStart={() => isSliding.value = true} // slider'ın kaydırılıp kaydırılmadığını kontrol eder
    //             onValueChange={async (value) => {
    //                 await TrackPlayer.seekTo(value * duration);
    //             }} // slider'ın değerini değiştirir
    //             onSlidingComplete={async (value) => {
    //                 if (!isSliding.value) return; // slider'ın kaydırılıp kaydırılmadığını kontrol eder
    //                 isSliding.value = false; // false olursa slider'ın kaydırıldığı anlamına gelir

    //                 await TrackPlayer.seekTo(value * duration); // slider'ın değerini değiştirir
    //             }}// slider'ın değerini değiştirir
    //         />

    //         <View style={styles.timeRow}> {/* zaman satırını oluşturur */}
    //             <Text style={styles.timeTxt}>{trackElapsedTime}</Text> {/* geçen süreyi gösterir */}
    //             <Text style={styles.timeTxt}>{'-'} {trackRemainingTime}</Text> {/* kalan süreyi gösterir */}
    //         </View>
    //     </View>
    
    // 

