import { View,  StyleSheet, Text, TouchableHighlight } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { unknownTrackImageUri } from '@/constants/images'
import { colors, fontSizes } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player'
import LoaderKit from 'react-native-loader-kit'
import { TrackShortcutsMenu } from './TrackShortcutsMenu'
import { StopPropagation } from '@/components/utils/StopPropagation'

export type TracksListProps = {
    track: Track
    onTrackSelect:  (track: Track) => void
}

export const TrackListItem = ({ track, onTrackSelect: handleTrackSelect }:
    TracksListProps) => {

    const { playing } = useIsPlaying()
    const isActiveTrack = useActiveTrack()?.url === track.url;
    
    return (
        
        <TouchableHighlight
            onPress={() => handleTrackSelect(track)}
        >
            
            <View style={styles.trackItemContainer}>
                {/* Track Artwork */}
                <View >
                    <FastImage source={{
                        uri:  track.artwork ?? unknownTrackImageUri,
                        priority: FastImage.priority.normal,

                    }}
                        style={[
                            styles.trackArtWorkImage,
                            { opacity: isActiveTrack ? 0.6 : 1 },
                        ]}
                    />
                    {isActiveTrack && (
                        playing ? (
                            <LoaderKit
                                name="LineScalePulseOutRapid"
                                color={colors.icon}
                                style={styles.trackPlayIcon}
                            />
                        ) : (
                            <Entypo
                                name="controller-play"
                                size={24}
                                color={colors.icon}
                                style={styles.trackPauseIcon}
                            />
                        ))}
                </View>
                <View style={styles.trackItemContainer2}>
                    {/* Track title + Artist */}
                    <View style={{ width: '100%' }}>
                        <Text numberOfLines={1}
                            style={[styles.trackTitleTxt, {
                                color: isActiveTrack ? colors.primary
                                    : colors.text,
                            }]}
                        >
                            {track.title}
                        </Text>

                        {track.artist && (
                            <Text
                                numberOfLines={1}
                                style={styles.trackArtistTxt}
                            >
                                {track.artist}
                            </Text>
                        )}

                    </View>
                    {/* // StopPropagation oynatılmayan şarkının seçeneklerine 
                    erişmek istediğimiz zaman otomatik oynatmaması adına yazılmıştır. */}
                    <StopPropagation>
                        {/* Track options menu */}
                        <TrackShortcutsMenu track={track}>
                            <Entypo name="dots-three-horizontal" size={16} color={colors.icon} />
                        </TrackShortcutsMenu>
                    </StopPropagation>

                </View>

            </View>

        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    trackArtWorkImage: {
        borderRadius: 15,
        width: 60,
        height: 60,
    },
    trackTitleTxt: {
        ...defaultStyles.text,
        fontSize: fontSizes.sm,
        fontWeight: '600',
        maxWidth: '90%'
    },
    trackArtistTxt: {
        ...defaultStyles.text,
        fontSize: 14,
        color: colors.textMuted,
        marginTop: 4,
    },
    trackItemContainer: {
        flexDirection: 'row',
        columnGap: 14,
        alignItems: 'center',
        paddingRight: 10,
        paddingVertical: 8,
        // top:150,
    },
    trackItemContainer2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,

    },
    trackPauseIcon: {
        position: 'absolute',
        top: 18,
        left: 18,
    },
    trackPlayIcon: {
        position: 'absolute',
        top: 18,
        left: 18,
        width: 24,
        height: 24,

    }
})


export default TrackListItem