import React, { PropsWithChildren } from 'react'
import TrackPlayer, { Track } from 'react-native-track-player'
import { MenuView } from '@react-native-menu/menu'
import { match } from 'ts-pattern'
import { useFavorite } from '@/store/library'
import { useQueue } from '@/store/queue'
import { useRouter } from 'expo-router'

type TrackShortcutsMenuProps = PropsWithChildren<{ track: Track }>



export const TrackShortcutsMenu = ({
    track,
    children
}: TrackShortcutsMenuProps) => {


    const router = useRouter(); // 'useRouter' hook'unu kullanarak router'ı alıyoruz.

    // 'isFavorite' değişkeni, track'in (şarkı/track nesnesinin) 'rating' (favori) özelliği 1 olup olmadığını kontrol eder. (boolean tipinde)
    // Eğer 'track.rating' 1 ise bu şarkı favorilerde demektir.
    const isFavorite = track.rating === 1;

    // 'toggleTrackFavorite' fonksiyonunu 'useFavorite' hook'undan alıyoruz. Bu fonksiyon favori işlemini yönetiyor.
    // 'activeQueueId' ise 'useQueue' hook'undan gelen aktif sıradaki id'yi tutar.
    const { toggleTrackFavorite } = useFavorite();
    const { activeQueueId } = useQueue();

    // 'handlePressAction' fonksiyonu, bir id (string tipinde) alarak tetiklenen eyleme göre işlem yapar.
    const handlePressAction = (id: string) => {

        // 'match' fonksiyonu, 'id'yi kontrol eder ve eşleşen değere göre işlem yapılmasını sağlar.
        match(id)

            // Eğer 'id' 'add-to-favorites' ile eşleşirse, aşağıdaki işlemler yapılır.
            .with('add-to-favorites', async () => {

                // 'toggleTrackFavorite' fonksiyonu çağrılır ve 'track' nesnesi favorilere eklenir veya çıkartılır.
                toggleTrackFavorite(track);

                // Eğer 'activeQueueId' değişkeni 'favorites' ile başlayan bir string ise,
                // bu durum favori listesine bir şey eklendiğini veya o listede olunduğunu gösterir.
                if (activeQueueId?.startsWith('favorites')) {

                    // 'TrackPlayer.add(track)' komutu, 'track'i (şarkıyı) TrackPlayer sırasına ekler.
                    await TrackPlayer.add(track);
                }
            })
            // Eğer 'id' 'remove-from-favorites' ile eşleşirse, aşağıdaki işlemler yapılır.
            .with('remove-from-favorites', async () => {
                toggleTrackFavorite(track);

                // Eğer 'activeQueueId' değişkeni 'favorites' ile başlayan bir string ise,
                // bu durum favori listesinden bir şey silindiğini veya o listeden çıkıldığını gösterir.
                if (activeQueueId?.startsWith('favorites')) {
                    // 'TrackPlayer.getQueue()' komutu, TrackPlayer sırasını getirir.
                    const queue = await TrackPlayer.getQueue();

                    // 'queue' dizisinde 'track' nesnesinin index'ini bulur. 
                    const trackToRemove = queue.findIndex(queueTrack => queueTrack.url === track.url);
                    // track urlleri uyuşuyorsa, o track'i sıradan çıkartır.

                    await TrackPlayer.remove(trackToRemove);
                }
            })
            .with('add-to-playlist', () => {
                // addToPlaylist modalını açar ve trackUrl'i parametre olarak gönderir.
                // // @ts-expect-error çalışmalı
                router.push({ pathname: `(modals)/addToPlaylist`, params: { trackUrl: track.url } })
            })
            .otherwise(() => console.warn(`Unknown menu actions: ${id}`));
    }

    return (
        <MenuView
            onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
            actions={[
                {
                    id: 'add-to-playlist',
                    title: 'Add to playlist',
                    image: 'plus',
                },
                {
                    id: isFavorite ? 'remove-from-favorites' : 'add-to-favorites',
                    title: isFavorite ? 'Remove from favorites' : 'Add to favorites',
                    image: isFavorite ? 'star.fill' : 'star',

                },
                {
                    id: 'add-to-library',
                    title: 'Add to library',

                }
            ]}
        >
            {children}
        </MenuView>
    )
}


