import { TouchableOpacity, View, ViewStyle, StyleSheet } from "react-native"
import TrackPlayer, { useIsPlaying } from "react-native-track-player"
import { FontAwesome6 } from '@expo/vector-icons'
import { colors } from "@/constants/tokens"

type PlayerControlsProps = {
    style?: ViewStyle
}

type PlayerButtonProps = {
    style?: ViewStyle
    iconSize?: number
}

export const PlayerControls = ({ style }: PlayerControlsProps) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.row}>
                <SkipToPreviousButton iconSize={24}/>
                <PlayPauseButton iconSize={36}/>
                <SkipToNextButton iconSize={24}/>
            </View>

        </View>
    )
}


export const PlayPauseButton = ({ style, iconSize }: PlayerButtonProps) => {
    const { playing } = useIsPlaying(); // bu sayede oynatma durumunu kontrol edebiliriz

    return (
        <View style={[{ height: iconSize }, style]}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
            >
                <FontAwesome6
                    name={playing ? 'pause' : 'play'}
                    size={iconSize}
                    color={colors.text} />
            </TouchableOpacity>
        </View>
    )
}

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => TrackPlayer.skipToNext()} 
        >
            <FontAwesome6
                name='forward'
                size={iconSize}
                color={colors.text}
            />
        </TouchableOpacity>
    )
}
export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => TrackPlayer.skipToPrevious()}
        >
            <FontAwesome6
                name='backward'
                size={iconSize}
                color={colors.text}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
})

