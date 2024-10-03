import { unknownArtistImageUri } from '@/constants/images'
import { colors, screenPadding } from '@/constants/tokens'
import { artistNameFilter } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useArtists } from '@/store/library'
import { defaultStyles, utilsStyles } from '@/styles'
import { Link } from 'expo-router'
import { useMemo } from 'react'
import { FlatList, StyleSheet, Text, TouchableHighlight, View, ScrollView } from 'react-native'
import FastImage from 'react-native-fast-image'

const ItemSeparatorComponent = () => {
  return <View style={[utilsStyles.itemSeperator, { marginLeft: 50, marginVertical: 12 }]} />
}

const ArtistsScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Find in artists',
      textColor: colors.text,
      hintTextColor: colors.textMuted,
      headerIconColor: colors.textMuted,
      barTintColor: colors.bar,
    },
  })
  // `artists` verisini `useArtists` adlı bir hook'tan alıyoruz. Bu hook, sanatçıları getirir.
  const artists = useArtists();

  // `useMemo` hook'u, hesaplanan değerin hafızada saklanmasını sağlar.
  // Yani, eğer `artists` veya `search` değişkenleri değişmediği sürece, `filteredArtists` her render'da yeniden hesaplanmaz.
  // Böylece performans iyileştirilir.
  const filteredArtists = useMemo(() => {
    // Eğer `search` değişkeni boşsa veya herhangi bir arama yapılmadıysa (length = 0),
    // tüm sanatçıları geri döndür.
    if (!search || search.length === 0) return artists;

    // Eğer `search` bir değere sahipse, `artistNameFilter` fonksiyonunu kullanarak 
    // sanatçılar listesini filtrele.
    return artists.filter(artistNameFilter(search));
  }, [artists, search]);
  // Bu `useMemo` bağımlılık dizisi; yani `artists` veya `search` değiştiğinde,
  // `useMemo` içindeki fonksiyon tekrar çalışacak ve `filteredArtists` değeri güncellenecek.

  return (
    <View style={defaultStyles.container2}>
      <ScrollView
        style={{ paddingHorizontal: screenPadding.horizantal }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <FlatList
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
          scrollEnabled={false}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListFooterComponent={ItemSeparatorComponent}
          ListEmptyComponent={
            <View>
              <Text>No artist found</Text>

              <FastImage
                source={{
                  uri: unknownArtistImageUri,
                  priority: FastImage.priority.normal,
                }}
                style={utilsStyles.emptyContentImage}
              />
            </View>
          }
          data={filteredArtists}
          renderItem={({ item: artist }) => {
            return ( // Sanatçılar listesini döndürür. Link ile sanatçıya tıklanınca sanatçıya yönlendirir.
              <Link href={`/artists/${artist.name}`} asChild>
                <TouchableHighlight activeOpacity={0.8}>
                  <View style={styles.artistItemContainer}>
                    <View>
                      <FastImage
                        source={{
                          uri: unknownArtistImageUri,  //şunu kullan en son -> artist.tracks[0].artwork ?? unknownArtistImageUri, |artwork yerine ArtistImgUrl oluştur ve kullan.
                          priority: FastImage.priority.normal,
                        }}
                        style={styles.artistImage}
                      />
                    </View>

                    <View style={{ width: '100%' }}>
                      <Text numberOfLines={1} style={styles.artistNameText}>
                        {artist.name}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </Link>
            )
          }}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  artistItemContainer: {
    flexDirection: 'row',
    columnGap: 14,
    alignItems: 'center',
  },
  artistImage: {
    borderRadius: 32,
    width: 40,
    height: 40,
  },
  artistNameText: {
    ...defaultStyles.text,
    fontSize: 17,
    maxWidth: '80%',
  },
})

export default ArtistsScreen