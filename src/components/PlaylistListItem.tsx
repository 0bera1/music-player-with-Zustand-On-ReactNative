import { View, Text, TouchableHighlightProps, TouchableHighlight, StyleSheet } from 'react-native'
import React from 'react'
import { playlist } from '@/helpers/types'
import { defaultStyles } from '@/styles'
import FastImage from 'react-native-fast-image'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '@/constants/tokens'

type PlaylistListItemProps = {
    playlist: playlist
} & TouchableHighlightProps

const PlaylistListItem = ({
    playlist,
    ...props
}: PlaylistListItemProps) => {
    return (
        <TouchableHighlight
            activeOpacity={0.6}
            {...props}
            
            >
            <View
                style={styles.playlistItemContainer}>
                <View>
                    <FastImage
                        source={{
                            uri: playlist.artworkPreview,
                            priority: FastImage.priority.normal
                        }}
                        style={styles.playlistImage}
                    />
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                    <Text numberOfLines={1} style={styles.playlistNameText}>{playlist.name}</Text>
                    <AntDesign
                        name='right'
                        size={16}
                        color={colors.icon}
                        style={{ opacity: 0.6 }}
                    />
                </View>
            </View>

        </TouchableHighlight>
    )
}
const styles = StyleSheet.create({
    playlistItemContainer: {
        flexDirection: 'row',
        columnGap: 14,
        alignItems: 'center',
        paddingRight: 90,
    },
    playlistImage: {
        borderRadius: 10,
        width: 70,
        height: 70,
    },
    playlistNameText: {
        ...defaultStyles.text,
        fontSize: 17,
        maxWidth: '80%',
        fontWeight: '600'
    },
})

export default PlaylistListItem