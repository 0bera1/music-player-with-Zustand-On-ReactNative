import { View, Text, FlatList, FlatListProps } from 'react-native'
import React, { useRef } from 'react'
import TrackListItem from '@/components/TrackListItem'
import { utilsStyles } from '@/styles';
import TrackPlayer, { Track } from 'react-native-track-player';
import FastImage from 'react-native-fast-image';
import { unknownTrackImageUri } from '@/constants/images';
import { useQueue } from '@/store/queue';
import { QueueControls } from './QueueControls';

{/* Hemen alttaki satır, TracksListProps adında bir tip tanımlar. 
    Partial ifadesi, FlatListProps tipi içerisindeki tüm prop'ların isteğe bağlı (optional)
    hale getirildiği anlamına gelir. 
    Yani, FlatList bileşeni için geçerli olan her prop'u kullanabilirsiniz
    ama hiçbiri zorunlu değildir. */}

export type TracksListProps = Partial<FlatListProps<Track>> & {
    id: string;
    tracks: Track[];
    hideQueueControls?: boolean;
}
// Yukarıdaki Track tipi, react-native-track-player kütüphanesinden gelir. Bir tür Oynatıcıdır.
{/*
    FlatListProps<unknown>: FlatList bileşeni için kullanılacak prop'ların tipidir. 
    Bu tip, liste elemanlarının tipine göre parametre alır. 
    
    Burada unknown kullanılmış, yani liste elemanlarının tipinin bilinmediğini belirtiyor.
    
    Partial: Tüm prop'ları isteğe bağlı hale getirir. 
     
    */}

// ItemDivider bileşeni, her bir liste elemanı arasına bir ayraç ekler.
const ItemDivider = () => (
    <View style={{
        ...utilsStyles.itemSeperator,
        marginVertical: -1, marginLeft: 70
    }} />
)

export const TracksList = ({
    id,
    tracks,
    hideQueueControls = false,
    ...flatlistProps
}: TracksListProps) => {
    const queueOffset = useRef(0) // useRef, bir değişkenin değerini saklamak için kullanılır. 
    //Şunun için kullanılır: Değişkenin değerini saklamak ve bu değeri güncellemek istediğinizde bileşenin yeniden render edilmesini istemezsiniz.
    const { activeQueueId, setActiveQueueId } = useQueue() // useQueue hook'unu kullanarak activeQueueId'yi ve setActiveQueueId fonksiyonunu alırız

    const handleTrackSelect = async (selectedTrack: Track) => {
        const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.url)

        if (trackIndex === -1) return;

        const isChanginQueue = id !== activeQueueId;

        if (isChanginQueue) { // Eğer şarkılar farklı bir listeden seçilirse
            const beforeTracks = tracks.slice(0, trackIndex)
            // slice metodu, başlangıç ve bitiş indeksleri alır ve başlangıç indeksinden bitiş indeksine kadar olan elemanları alır.
            // slice(0, trackIndex) ile, 0. indeksten trackIndex'e kadar olan elemanları alırız.
            const afterTracks = tracks.slice(trackIndex + 1)
            // slice(trackIndex + 1) ile, trackIndex'ten sonraki elemanları alırız.

            await TrackPlayer.reset() // reset metodu, oynatma sırasındaki tüm şarkıları temizler. 
            // Burada bunu kullanmamızın sebebi playlistte miyiz favorilerde miyiz ona göre oynatma sırasını belirlemek.


            // add metodu, oynatma sırasına şarkı ekler. BÖYLELİKLE YENİ OYNATMA SIRASI BELİRLENMİŞ OLUR.
            await TrackPlayer.add(selectedTrack) // seçilen şarkıyı ekler
            await TrackPlayer.add(afterTracks) // bir sonraki şarkıları ekler
            await TrackPlayer.add(beforeTracks) // burada beforeTracks'i kullanmamızın sebebi listedeki son şarkı da çalındığında başa dönmesi için

            await TrackPlayer.play() // play metodu, oynatma sırasındaki şarkıları çalmaya başlar.

            queueOffset.current = trackIndex // trackIndex'i queueOffset.current'a atarız.
            setActiveQueueId(id) // activeQueueId'yi id'ye eşitleriz.

        } else { // Eğer aynı listeden şarkı seçilirse

            // nextTrack fonksiyonu, oynatma sırasındaki bir sonraki şarkıyı döndürür.
            const nextTrackIndex = trackIndex - queueOffset.current < 0 // Eğer trackIndex - queueOffset.current 0'dan küçükse
                ? tracks.length + trackIndex - queueOffset.current // tracks.length + trackIndex - queueOffset.current
                : trackIndex - queueOffset.current // değilse trackIndex - queueOffset.current döndürür. 

            await TrackPlayer.skip(nextTrackIndex) // skip metodu, oynatma sırasındaki belirli bir şarkıya atlar.
            TrackPlayer.play()

        }
    }
    {/* 
        {...flatlistProps}:TracksListProps kısmı ise;
         TracksListProps daki tüm propları alır flatlistProps'a yerleştirir 
    */}

    return (
        <FlatList
            data={tracks}
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 150 }}
            ItemSeparatorComponent={ItemDivider}
            ListFooterComponent={ItemDivider}
            ListHeaderComponent={
                !hideQueueControls ?(
                <QueueControls
                    tracks={tracks}
                    style={{ paddingBottom: 20 }} />
                ) : undefined
            }
            ListEmptyComponent={<View>
                <Text style={utilsStyles.emptyContentText}>
                    No tracks found...
                </Text>
                <FastImage
                    source={{
                        uri: unknownTrackImageUri,
                        priority: FastImage.priority.normal
                    }}
                    style={utilsStyles.emptyContentImage}
                />
            </View>}
            renderItem={({ item: track }) => (
                <TrackListItem
                    track={track}
                    onTrackSelect={handleTrackSelect}
                />
            )}
            {...flatlistProps}
        /* {...flatlistProps}, bu objeyi FlatList bileşenine yayarak tüm prop'ları aktarır. */

        />

    )

}

export default TracksList