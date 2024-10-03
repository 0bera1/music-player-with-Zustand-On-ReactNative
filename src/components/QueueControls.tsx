import { colors } from "@/constants/tokens"
import { defaultStyles } from "@/styles"
import { View, ViewProps, StyleSheet, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import TrackPlayer, { Track } from "react-native-track-player"
import { play } from "react-native-track-player/lib/src/trackPlayer"
import { Ionicons } from '@expo/vector-icons'

// QueueControls bileşeni, çalma listesi ve karışık çalma işlevselliğini sağlar.
// QueueControlsProps tipini tanımlıyoruz. Bu tip, ViewProps'u genişletiyor ve 'tracks' adında bir dizi Track objesi içeriyor.
export type QueueControlsProps = {
    tracks: Track[] // tracks, şarkıların dizisini temsil eder.
} & ViewProps // ViewProps, React Native'deki View bileşeni için kullanılan tüm standart özellikleri içerir.

// QueueControls bileşeni, çalma listesi ve karışık çalma işlevselliğini sağlar.
export const QueueControls = ({ tracks, style, ...viewProps }: QueueControlsProps) => {
    // handlePlay fonksiyonu, şarkıları sıralı şekilde çalmaya başlar.
    const handlePlay = async () => {
        await TrackPlayer.setQueue(tracks) // TrackPlayer'ın çalma sırasına şarkıları ekler.
        await TrackPlayer.play() // Şarkıları çalmaya başlar.
    }

    // handleShufflePlay fonksiyonu, şarkıları rastgele sırayla çalar.
    const handleShufflePlay = async () => {
        const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5) // Şarkıları rastgele sıralar.
        await TrackPlayer.setQueue(shuffledTracks) // Rastgele sıralanan şarkıları çalma sırasına ekler.
        await TrackPlayer.play() // Şarkıları çalmaya başlar.
    }

    // Bileşen UI'si; Play ve Shuffle butonlarını içerir.
    return (
        <View
            style={[{
                flexDirection: 'row', 
                columnGap: 16 
            }, style]} 
            {...viewProps} 
        >
            {/* Play button */} 
            <View style={{ flex: 1 }}> 
                <TouchableOpacity
                    activeOpacity={0.7} 
                    style={styles.Button} 
                    onPress={handlePlay} 
                >
                    <Ionicons name="play" size={24} color={colors.primary} /> 
                    <Text style={styles.buttonTxt}>Play</Text>
                </TouchableOpacity>
            </View>

            {/* Shuffle button */}
            <View style={{ flex: 1 }}> 
                <TouchableOpacity
                    activeOpacity={0.7} 
                    style={styles.Button}
                    onPress={handleShufflePlay}     
                >
                    <Ionicons name="shuffle" size={24} color={colors.primary} /> 
                    <Text style={styles.buttonTxt}>Shuffle</Text> 
                </TouchableOpacity>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    Button: {
        padding: 8,
        backgroundColor: 'rgba(47,47,47,0.5)',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 8
    },
    buttonTxt: {
        ...defaultStyles.text,
        color: colors.primary,
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'center',
    }

})
