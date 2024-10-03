import { Artist, playlist, TrackWithPlaylist } from "@/helpers/types";
import { Track } from "react-native-track-player";
import { create } from "zustand";
import library from '@/assets/data/library.json'
import { useMemo } from "react";
import { unknownTrackImageUri } from "@/constants/images";

interface LibraryState {
  tracks: TrackWithPlaylist[]
  toogleTrackFavorite: (track: Track) => void
  addToPlaylist: (track: Track, PlaylistName: string) => void
  removeFromPlaylist: (track: Track, playlistName: string) => void;

} // Bu interface ile store'un içinde olacak state'leri ve fonksiyonları tanımlıyoruz

export const useLibraryStore = create<LibraryState>()((set) => ({ // create fonksiyonu ile bir store oluşturuyoruz
  // store oluşturma sebebimiz favori olan şarkıları ve playlistleri saklamak

  tracks: library,
  toogleTrackFavorite: (track) => set((state) => ({
    tracks: state.tracks.map((currentTrack) => {
      if (currentTrack.url === track.url) {
        return {
          ...currentTrack,
          rating: currentTrack.rating === 1 ? 0 : 1
        }
      }
      return currentTrack
    })
  })),
  addToPlaylist: (track, playlistName) => set((state) => ({
    tracks: state.tracks.map((currentTrack) => {
      if (currentTrack.url === track.url) {
        return {
          ...currentTrack,
          playlist: [...(currentTrack.playlist ?? []), playlistName],
        }
      }
      return currentTrack
    })
  })),
  // Track'i belirtilen playlistten çıkarma fonksiyonu.
  removeFromPlaylist: (track: Track, playlistName: string) =>
    set((state) => ({
      tracks: state.tracks.map((t) =>
        t.url === track.url
          ? {
              ...t,
              playlist: t.playlist?.filter(
                (name) => name !== playlistName
              ),
            }
          : t
      ),
    })),
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)  // diğer componentlerde tracks state'ine erişmek için kullanılır
// Ayrıca diğer componentlerde library.json'a doğrdudan erişmek yerine bu hook'u kullanarak tracks state'ine erişebiliriz

export const useFavorite = () => {
  const tracks = useLibraryStore((state) => state.tracks) // tracks state'ini alır

  const favorites = useMemo(() => {
    return tracks.filter((track) => track.rating === 1)
  }, [tracks]) // tracks değiştiğinde favorites'i yeniden hesaplar.

  const toggleTrackFavorite = useLibraryStore((state) => state.toogleTrackFavorite)

  return {
    favorites,
    toggleTrackFavorite,
  }
  // favorites ve toggleTrackFavorite fonksiyonunu döndürür, bunu sebebimiz favori olan şarkıları ve favori olmayan şarkıları ayırmak
}


// useArtists adında bir custom hook oluşturuyoruz. Bu hook, uygulamadaki şarkıcıları (artist) ve onların şarkılarını gruplamak için kullanılır.
export const useArtists = () => {
  // tracks adında bir değişken oluşturuluyor ve useLibraryStore ile global state'den ( Zustand state management kütüphanesinden) 'tracks' (şarkılar) bilgisi çekiliyor.
  const tracks = useLibraryStore((state) => state.tracks);

  // useMemo kullanılarak 'tracks' değiştiğinde hesaplanacak bir değer döndürülüyor. Bu sayede gereksiz hesaplamalar engelleniyor.
  return useMemo(() => {
    // tracks array'inde reduce fonksiyonu kullanılarak artistler ve şarkıları gruplandırılıyor. 
    // acc birikimli sonuç (accumulator) olarak başta boş bir array (Artist[]) olarak başlatılıyor.
    return tracks.reduce((acc, track) => {
      // acc içinde, track'in artist ismi ile eşleşen bir artist olup olmadığını kontrol ediyoruz.
      const existingArtist = acc.find((artist) => artist.name === track.artist);

      // Eğer artist zaten varsa, o artistin 'tracks' array'ine mevcut şarkıyı ekliyoruz.
      if (existingArtist) {
        existingArtist.tracks.push(track);
      } else {
        // Eğer artist yoksa, yeni bir artist oluşturup tracks array'ine o şarkıyı ekliyoruz. Eğer artist adı yoksa 'Unknown' olarak atanıyor.
        acc.push({
          name: track.artist ?? 'Unknown',
          tracks: [track],
        });
      }

      // acc birikimli sonucu döndürüyoruz.
      return acc;
    }, [] as Artist[]); // Başlangıç değeri olarak boş bir Artist array'i veriliyor.
  }, [tracks]); // tracks değiştiğinde hesaplamanın tekrar yapılmasını sağlıyor.
};

// usePlaylists adında bir custom hook oluşturuyoruz. Bu hook, uygulamadaki playlistleri ve şarkıları gruplamak için kullanılır.
export const usePlaylists = () => {
  // useLibraryStore hook'u ile global state'den 'tracks' bilgisi çekiliyor.
  const tracks = useLibraryStore((state) => state.tracks);

  // useLibraryStore'dan 'addToPlaylist' ve 'removeFromPlaylist' fonksiyonları çekiliyor.
  const addToPlaylist = useLibraryStore((state) => state.addToPlaylist);
  const removeFromPlaylist = useLibraryStore((state)=> state.removeFromPlaylist)
  // useMemo kullanılarak 'playlists' değişkeni optimize ediliyor. Sadece 'tracks' değiştiğinde yeniden hesaplanacak.
  const playlists = useMemo(() => {
    return tracks.reduce((acc, track) => {
      // Eğer track'in 'playlist' özelliği varsa, her bir playlist ismi için işlem yapılacak.
      track.playlist?.forEach((playlistName) => {
        // Playlist'i mevcut listede bulmaya çalışıyoruz.
        const existingPlaylist = acc.find((playlist) => playlist.name === playlistName);

        // Eğer playlist varsa, o playlist'e mevcut track'i ekliyoruz.
        if (existingPlaylist) {
          existingPlaylist.tracks.push(track);
        } else {
          // Eğer playlist yoksa, yeni bir playlist oluşturuyoruz.
          acc.push({
            name: playlistName,
            tracks: [track],
            artworkPreview: track.artwork ?? unknownTrackImageUri,
          });
        }
      });
      return acc;
    }, [] as playlist[]); // Başlangıç değeri olarak boş bir playlist array'i veriliyor.
  }, [tracks]); // 'tracks' bağımlılığı ekleniyor, sadece 'tracks' değiştiğinde 'playlists' yeniden hesaplanacak.

  // Fonksiyon, hesaplanmış 'playlists', 'addToPlaylist' ve 'removeFromPlaylist' fonksiyonlarını geri döndürüyor.
  return { playlists, addToPlaylist, removeFromPlaylist };
};
