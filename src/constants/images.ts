import unknownArtistImage from '@/assets/unknown_artist.jpg';
import unknownTrackImage from '@/assets/unknown_track.jpg';
import { Image } from 'react-native';

export const unknownArtistImageUri = Image.resolveAssetSource(unknownArtistImage).uri;
export const unknownTrackImageUri = Image.resolveAssetSource(unknownTrackImage).uri;