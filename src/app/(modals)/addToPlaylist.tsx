import React from 'react'
import { PlaylistsList } from '@/components/PlaylistsList'
import { usePlaylists, useTracks } from '@/store/library'
import { useRouter, useLocalSearchParams } from 'expo-router'
import TrackPlayer, { Track } from 'react-native-track-player'
import { SafeAreaView } from 'react-native-safe-area-context'
import { playlist } from '@/helpers/types'
import { useQueue } from '@/store/queue'
import { defaultStyles } from '@/styles'
import { useHeaderHeight } from '@react-navigation/elements'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { colors, screenPadding } from '@/constants/tokens'
import { Ionicons } from '@expo/vector-icons' // Check işareti için ikon

const AddToPlaylist = () => {
  const router = useRouter()
  const { activeQueueId } = useQueue()
  const headerHeight = useHeaderHeight()

  // useLocalSearchParams ile trackUrl parametresini alıyoruz
  const { trackUrl } = useLocalSearchParams<{ trackUrl: Track['url'] }>()
  // useTracks ile tüm trackleri alıyoruz
  const tracks = useTracks()

  // usePlaylists ile tüm playlistleri alıyoruz
  const { playlists, addToPlaylist, removeFromPlaylist } = usePlaylists()

  // trackUrl parametresine göre tracki buluyoruz
  const track = tracks.find((currentTrack) => trackUrl === currentTrack.url)
  if (!track) {
    return null
  }

  const handlePlaylistPress = async (playlist: playlist) => {
    const isTrackInPlaylist = playlist.tracks.some(
      (playlistTrack) => playlistTrack.url === track.url
    )

    if (isTrackInPlaylist) {
      // Track mevcutsa, playlistten çıkar
      removeFromPlaylist(track, playlist.name)
    } else {
      // Track mevcut değilse, playlist'e ekle
      addToPlaylist(track, playlist.name)

      // Eğer aktif queue playlist ise, track'i oynatma listesine ekle
      if (activeQueueId?.startsWith(playlist.name)) {
        await TrackPlayer.add(track)
      }
    }
    
    // Modalı kapatıyoruz
    router.dismiss()
  }

  return (
    <SafeAreaView style={[styles.modalContainer, { paddingTop: headerHeight }]}>
      {playlists.map((playlist) => {
        const isTrackInPlaylist = playlist.tracks.some(
          (playlistTrack) => playlistTrack.url === track.url
        )

        return (
          <TouchableOpacity
            key={playlist.name}
            onPress={() => handlePlaylistPress(playlist)}
            style={styles.playlistItem}
          >
            <Text style={styles.playlistText}>{playlist.name}</Text>
            {isTrackInPlaylist && (
              <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            )}
          </TouchableOpacity>
        )
      })}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    ...defaultStyles.container,
    paddingHorizontal: screenPadding.horizantal,
  },
  playlistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 15,
    
    
  },
  playlistText: {
    ...defaultStyles.text,
    fontSize: 16,

  },
})

export default AddToPlaylist
