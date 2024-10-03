import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import TracksList from './TracksList'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { colors, fontSizes } from '@/constants/tokens'
import { playlistNameFilter, trackTitleFilter } from '@/helpers/filter'
import { playlist } from '@/helpers/types'
import { generateTrackListId } from '@/helpers/miscellaneous'
import { defaultStyles } from '@/styles'
import FastImage from 'react-native-fast-image'
import { QueueControls } from './QueueControls'

const PlaylistTracksList = ({ playlist }: { playlist: playlist }) => {
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: 'Search Songs',
            textColor: colors.text,
            hintTextColor: colors.textMuted,
            headerIconColor: colors.textMuted,
            barTintColor: colors.bar,
        },
    })

    const filteredPlaylistTracks = useMemo(() => {
        return playlist.tracks.filter(trackTitleFilter(search))

    }, [playlist, search])
    return (
        <TracksList
            id={
                generateTrackListId(
                    playlist.name, search
                )
            }
            scrollEnabled={false}
            hideQueueControls={true}
            ListHeaderComponentStyle={styles.playlistHeaderContainer}
            ListHeaderComponent={
                <View>
                    <View 
                    style={styles.artworkImageContainer}
                    >
                        <FastImage 
                        source={{
                            uri: playlist.artworkPreview,
                            priority: FastImage.priority.high
                        }}
                        style={styles.artworkImage}
                        />
                    </View>
                    <Text numberOfLines={1} style={styles.playlistNameText}>{playlist.name}</Text>

                    { search.length === 0 &&(
                       <QueueControls style={{paddingTop: 24}} tracks={playlist.tracks}/>
                    )}
                </View>
            }
            tracks={filteredPlaylistTracks} 
            />
    )
}

const styles = StyleSheet.create({
    playlistHeaderContainer: {
        flex: 1,
        marginBottom: 32,
        

    },
    artworkImageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 300,
        
    },
    artworkImage: {
        width: '85%',
        height: '100%',
        borderRadius: 12,
        resizeMode: 'cover',
    },
    playlistNameText: {
        ...defaultStyles.text,
        fontSize: fontSizes.lg,
        fontWeight: 'bold',
        marginTop: 22,
        textAlign: 'center',
    },

})


export default PlaylistTracksList