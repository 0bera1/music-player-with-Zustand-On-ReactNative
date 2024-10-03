import { useFavorite } from "@/store/library";
import { useCallback } from "react";
import TrackPlayer, { useActiveTrack } from "react-native-track-player"

export const useTrackPlayerFavorite = () => {
    const activeTrack = useActiveTrack(); // 'useActiveTrack' hook'unu kullanarak aktif şarkıyı alıyoruz.
    // 'useFavorite' hook'unu kullanarak favori şarkıları ve 'toggleTrackFavorite' fonksiyonunu alıyoruz.
    // 'isFavorite' değişkeni, favori şarkıların içinde aktif şarkının olup olmadığını kontrol eder.
    const { favorites, toggleTrackFavorite } = useFavorite();


    const isFavorite = favorites.find(
        (track) => track.url === activeTrack?.url)?.rating === 1;

    // 'toggleFavorite' fonksiyonu, aktif şarkının favori durumunu değiştirir.
    const toggleFavorite = useCallback(async () => {
        const id = await TrackPlayer.getActiveTrackIndex();
        if (id == null) return;
        // 'TrackPlayer.updateMetadataForTrack' fonksiyonu, bir şarkının metadata'sını günceller.
        await TrackPlayer.updateMetadataForTrack(id,
            { rating: isFavorite ? 0 : 1 });
        // 'toggleTrackFavorite' fonksiyonu, aktif şarkının favori durumunu değiştirir.
        if (activeTrack) {
            toggleTrackFavorite(activeTrack);
        }
    }, [activeTrack, isFavorite, toggleTrackFavorite]);
    return { isFavorite, toggleFavorite };
}