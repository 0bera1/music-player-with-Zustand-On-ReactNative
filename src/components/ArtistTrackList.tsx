import { View, Text, StyleSheet, } from 'react-native'
import React, { useMemo } from 'react'
import { Artist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { colors, fontSizes } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import TracksList from './TracksList'
import { generateTrackListId } from '@/helpers/miscellaneous'
import FastImage from 'react-native-fast-image'
import { unknownArtistImageUri } from '@/constants/images'
import { defaultStyles } from '@/styles'
import { QueueControls } from './QueueControls'
import { StatusBar } from 'expo-status-bar'


const ArtistTrackList = ({ artist }: { artist: Artist }) => {
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: 'Find in artists',
            textColor: colors.text,
            hintTextColor: colors.textMuted,
            headerIconColor: colors.textMuted,
            barTintColor: colors.bar,
            shouldShowHintSearchIcon: true
        },
    })
    // `artist.tracks` verisini `useMemo` hook'u ile filtreliyoruz.
    const filtredArtistsTracks = useMemo(() => { // `useMemo` hook'u, hesaplanan değerin hafızada saklanmasını sağlar.
        return artist.tracks.filter(trackTitleFilter(search)) // Eğer `search` bir değere sahipse, `trackTitleFilter` fonksiyonunu kullanarak sanatçılar listesini filtrele.
        // `trackTitleFilter` fonksiyonunu kullanarak sanatçılar listesini filtrelere.
    }, [artist.tracks, search]) // Bu `useMemo` bağımlılık dizisi; yani `artist.tracks` veya `search` değiştiğinde, 
    //`useMemo` içindeki fonksiyon tekrar çalışacak ve `filteredArtists` değeri güncellenecek.

    return (
        <>
            <StatusBar style="dark" backgroundColor={colors.background} translucent />
            <TracksList
                id={generateTrackListId(artist.name, search)}
                scrollEnabled={false}
                ListHeaderComponentStyle={styles.artistHeaderContainer}
                ListHeaderComponent={
                    <View >
                        <View style={styles.artworkImageContainer}>
                            <FastImage
                                source={{
                                    uri: unknownArtistImageUri, // Sanatçı resimleri eklenecek
                                    priority: FastImage.priority.high // Hızlı yükleme
                                }}
                                style={styles.artistImage}
                            />
                        </View>
                        <Text
                            numberOfLines={1}
                            style={styles.artistName}
                        > {artist.name}</Text>

                        {search.length === 0 && (
                            <QueueControls tracks={filtredArtistsTracks} style={{ paddingTop: 24 }} />
                        )}



                    </View>
                }
                tracks={artist.tracks}

            />
        </>
    )
}

const styles = StyleSheet.create({
    artistHeaderContainer: {
        flex: 1,
        marginBottom: 32,

    },
    artworkImageContainer: {
        flexDirection: 'row',
        height: 200,
        justifyContent: 'center',
    },
    artistImage: {
        width: '60%',
        height: '108%',
        borderRadius: 128,
        resizeMode: 'cover',

    },
    artistName: {
        ...defaultStyles.text,
        marginTop: 29,
        textAlign: 'center',
        fontSize: fontSizes.lg,
        fontWeight: '700'
    }
})


export default ArtistTrackList