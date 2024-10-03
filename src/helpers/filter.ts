import { Artist, playlist } from "./types"

// Bu fonksiyonlar, artist, şarkı ve playlist isimlerine göre filtreleme yapmak için kullanılır.
// Search için olan fonksiynlarda kullanacağız.
export const trackTitleFilter = (title : string)=>(track : any) => 
    track.title?.toLowerCase().includes(title.toLowerCase())

export const artistNameFilter = (name: string) => (artist: Artist) =>
	artist.name.toLowerCase().includes(name.toLowerCase())

export const playlistNameFilter = (name : string) => (playlist: playlist)=>
    playlist.name.toLowerCase().includes(name.toLowerCase())

