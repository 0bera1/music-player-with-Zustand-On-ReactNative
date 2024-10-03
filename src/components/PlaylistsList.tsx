import { View, Text, FlatListProps, FlatList } from 'react-native'
import React, { useMemo } from 'react'
import { playlist } from '@/helpers/types'
import { colors, screenPadding } from '@/constants/tokens'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { playlistNameFilter } from '@/helpers/filter'
import { utilsStyles } from '@/styles'
import FastImage from 'react-native-fast-image'
import { unknownTrackImageUri } from '@/constants/images'
import PlaylistListItem from '@/components/PlaylistListItem'

type PlaylistsListProps = {
    playlists: playlist[],
    onPlaylistPress: (playlist: playlist) => void
} & Partial<FlatListProps<playlist>>

const ItemDivider = () => (
    <View
        style={{
            ...utilsStyles.itemSeperator,
            marginVertical: 12.5,
            marginLeft: 70,
        }}
    />
)

export const PlaylistsList = ({
    playlists,
    onPlaylistPress: handlePlaylistPress,
    ...flatListProps
}: PlaylistsListProps) => {
    // Arama fonksiyonu ve arama çubuğu
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: 'Search Playlists',
            textColor: colors.text,
            hintTextColor: colors.textMuted,
            headerIconColor: colors.textMuted,
            barTintColor: colors.bar,
        },
    })

    // Filtrelenmiş playlist'ler
    const filteredPlaylists = useMemo(() => {
        return playlists.filter(playlistNameFilter(search))
    }, [playlists, search])

    return (
        <FlatList
            contentContainerStyle={{
                paddingTop: 10,
                paddingBottom: 130,
            }}
            ItemSeparatorComponent={ItemDivider}
            ListFooterComponent={ItemDivider}
            // Playlist bulunamazsa gösterilecek bileşen
            ListEmptyComponent={
                <View>
                    <Text style={utilsStyles.emptyContentText}>
                        No playlist found
                    </Text>
                    <FastImage
                        source={{
                            uri: unknownTrackImageUri,
                            priority: FastImage.priority.normal,
                        }}
                        style={utilsStyles.emptyContentImage}
                    />
                </View>
            }
            data={filteredPlaylists}
            // Liste elemanları render ediliyor
            renderItem={({ item: playlist }) => (
                <PlaylistListItem
                    playlist={playlist}
                    onPress={() => handlePlaylistPress(playlist)}
                />
            )}
            {...flatListProps} // FlatList'e eklenmiş diğer prop'ları geçiyoruz
        />
    )
}

export default PlaylistsList
