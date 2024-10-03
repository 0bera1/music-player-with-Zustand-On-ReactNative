import { View, Text, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { defaultStyles } from '@/styles'
import TracksList from '@/components/TracksList'
import { colors, screenPadding } from '@/constants/tokens'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { trackTitleFilter } from '@/helpers/filter'
import { useTracks } from '@/store/library'
import { generateTrackListId } from '@/helpers/miscellaneous'

const SongsScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Search Songs',
      textColor: colors.text,
      hintTextColor: colors.textMuted,
      headerIconColor: colors.textMuted,
      barTintColor: colors.bar,

    },
  })
  const tracks = useTracks() // store'dan tracks state'ini alır (dolaylı olarak library.json'dan tracks'ı alır)
  const filteredSongs = useMemo(() => { // tracks'ı ve search'ü kullanarak filtrelenmiş şarkıları döndürür
    if (!search) return tracks

    return tracks.filter(trackTitleFilter(search))
  }, [search, tracks]) // search veya tracks değiştiğinde filtrelenmiş şarkıları yeniden hesaplar
  return (
    <View style={defaultStyles.container2}>
      <View style={defaultStyles.container}>

        <ScrollView
          contentInsetAdjustmentBehavior='automatic' // iOS only
          style={{ paddingHorizontal: screenPadding.horizantal }}
        >
          <TracksList
            id={generateTrackListId('songs', search)} 
            tracks={filteredSongs}
            scrollEnabled={false}
          />
        </ScrollView>

      </View>
    </View>

  )
}

export default SongsScreen