import { View, Text, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { defaultStyles } from '@/styles'
import library from '@/assets/data/library.json'
import TracksList from '@/components/TracksList'
import { colors, screenPadding } from '@/constants/tokens'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useFavorite } from '@/store/library'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTrackListId } from '@/helpers/miscellaneous'




const FavoritesScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Search Songs',
      textColor: colors.text,
      hintTextColor: colors.textMuted,
      headerIconColor: colors.textMuted,
      barTintColor: colors.bar,

    },
  })

  // const favoriteTracks = useFavorite().favorite.filter(trackTitleFilter(search)) bu kullanım tam değildir !
  const favoritesTracks = useFavorite().favorites

  const filteredFavoritesTracks = useMemo(() => {
    if (!search) return favoritesTracks

    return favoritesTracks.filter(trackTitleFilter(search))
  }, [search, favoritesTracks]) // search ve favoritesTracks değiştiğinde filtreleme yapar
  // useMemo burada kullanılmazsa her renderda filtreleme yapar ve performansı düşürür 
  // useMemo sayesinde sadece search ve favoritesTracks değiştiğinde filtreleme yapar ve performansı arttırır

  return (
    <View style={defaultStyles.container2}>
      <View style={defaultStyles.container}>
        <ScrollView
          style={{ paddingHorizontal: screenPadding.horizantal }}
          contentInsetAdjustmentBehavior='automatic' // iOS only
        >
          <TracksList
            id={generateTrackListId('favorites', search)}
            scrollEnabled={false}
            tracks={filteredFavoritesTracks}
          />
        </ScrollView>
      </View>
    </View>
  )
}

export default FavoritesScreen