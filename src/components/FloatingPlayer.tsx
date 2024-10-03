
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import React from 'react'
import { useActiveTrack } from 'react-native-track-player'
import FastImage from 'react-native-fast-image';
import { unknownTrackImageUri } from '@/constants/images';
import { defaultStyles } from '@/styles';
import { colors, fontSizes } from '@/constants/tokens';
import { PlayPauseButton, SkipToNextButton } from '@/components/PlayerControls';
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack';
import { MovingText } from './MovingText';
import { useRouter } from 'expo-router';

const FloatingPlayer = ({ style }: ViewProps) => {

    const router = useRouter(); // şunun için yapıyoruz: FloatingPlayer componenti, Player ekranına yönlendirme yapacak.
   
   
    const activeTrack = useActiveTrack();

    const lastActiveTrack = useLastActiveTrack();

    const displayedTrack = activeTrack ?? lastActiveTrack

    const handlePress = () => {
        router.navigate('/Player');

    }

    if (!displayedTrack) return null;


    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            style={[styles.container, style,]}
        >
            <>
                <FastImage
                    source={{
                        uri: displayedTrack.artwork ?? unknownTrackImageUri
                    }}
                    style={styles.trackArtWork}
                />

                <View style={styles.trackTitleContainer}>
                    {/* Track Title */}
                    <MovingText
                        style={styles.trackTitle}
                        text={displayedTrack.title ?? ''}
                        animationThreshold={25} // 25 karakterden sonra animasyon başlar.
                    />
                    {/* Track Artist */}
                    <Text style={styles.trackArtist}>{displayedTrack.artist ?? 'Unknown Artist'}</Text>
                </View>

                <View style={styles.trackControlsContainer} >
                    {/* Play/Pause Button */}
                    <PlayPauseButton iconSize={24} />
                    <SkipToNextButton iconSize={18} />
                </View>
            </>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#252525',
        padding: 8,
        borderRadius: 12,
        paddingVertical: 10,
        height: '7.5%',
        opacity: 0.987,
    },
    trackArtWork: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    trackTitle: {
        ...defaultStyles.text,
        fontSize: fontSizes.base,
        fontWeight: '600',
        paddingLeft: 10,
    },
    trackTitleContainer: {
        flex: 1,
        overflow: 'hidden',
        marginLeft: 10,
    },
    trackArtist: {
        ...defaultStyles.text,
        fontSize: fontSizes.sm,
        paddingLeft: 10,
        color: colors.textMuted,
    },
    trackControlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 14,
        marginRight: 14,
        marginLeft: 14,
    }
})

export default FloatingPlayer