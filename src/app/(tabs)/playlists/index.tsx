import { View, Text, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { defaultStyles } from '@/styles'
import { colors, screenPadding } from '@/constants/tokens'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { usePlaylists } from '@/store/library'
import { playlistNameFilter } from '@/helpers/filter'
import { playlist } from '@/helpers/types'
import { useRouter } from 'expo-router'
import PlaylistsList from '@/components/PlaylistsList'


const PlaylistScreen = () => {

  const router = useRouter()

  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Search Songs',
      textColor: colors.text,
      hintTextColor: colors.textMuted,
      headerIconColor: colors.textMuted,
      barTintColor: colors.bar,
    },
  })

  const { playlists } = usePlaylists() // usePlaylists hook'u ile playlists state'ine erişiyoruz
  const filteredPlaylists = useMemo(() => {
    return playlists.filter(playlistNameFilter(search))

  }, [playlists, search])

  const handlePlaylistPress = (playlist: playlist) => {
    router.push(`/(tabs)/playlists/${playlist.name}`)
  }
  return (
    <View style={defaultStyles.container2}>
      <ScrollView
        contentInsetAdjustmentBehavior='automatic' // iOS only
        style={{ paddingHorizontal: screenPadding.horizantal }}
      >
        <PlaylistsList
          scrollEnabled={false}
          playlists={filteredPlaylists}
          onPlaylistPress={handlePlaylistPress}
        />

      </ScrollView>
    </View>
  )
}

export default PlaylistScreen