import React from 'react';
import { View, ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Slider } from 'react-native-awesome-slider';
import { colors } from '@/constants/tokens';
import { useSharedValue } from 'react-native-reanimated';
import { useTrackPlayerVolume } from '@/hooks/useTrackPlayerVolume';
import { utilsStyles } from '@/styles';


export const PlayerVolumeBar = ({ style }: ViewProps) => {
    const { volume, updateVolume } = useTrackPlayerVolume(); // şunu ifade eder: ses seviyesini güncelle


    const progress = useSharedValue(0); // slider'ın ilerleme durumunu kontrol eder

    const min = useSharedValue(0); // slider'ın minimum değerini kontrol eder
    const max = useSharedValue(1); // slider'ın maksimum değerini kontrol eder

    progress.value = volume ?? 0; // slider'ın ilerleme durumunu kontrol eder

    return (
        <View style={style}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='volume-low'
                    size={20}
                    color={colors.icon}
                    style={{ opacity: 0.8 }}
                />
                <View style={{flex:1,flexDirection:'row',paddingHorizontal:12}}>
                    <Slider
                        progress={progress}
                        minimumValue={min}
                        maximumValue={max}
                        containerStyle={utilsStyles.slider}
                        onValueChange={(value) => {
                            updateVolume(value)
                        }}
                        renderBubble={() => null}
                        theme={{
                            minimumTrackTintColor: colors.minimumTrackTintColor,
                            maximumTrackTintColor: colors.maximumTrackTintColor,
                        }}
                        thumbWidth={0}

                    />
                </View>
                <Ionicons name='volume-high'
                    size={20}
                    color={colors.icon}
                    style={{ opacity: 0.8 }}
                />

            </View>

        </View>
    )
}

