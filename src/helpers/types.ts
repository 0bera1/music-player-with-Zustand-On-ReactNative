import { Track } from "react-native-track-player";

export type playlist = {
    name: string,
    tracks: Track[]
    artworkPreview: string
}

export type Artist = {
    name: string
    tracks: Track[]
}


export type TrackWithPlaylist = Track & { playlist?: string[] }