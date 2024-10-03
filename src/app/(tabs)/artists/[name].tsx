import ArtistTrackList from "@/components/ArtistTrackList";
import { screenPadding } from "@/constants/tokens";
import { useArtists } from "@/store/library";
import { defaultStyles } from "@/styles";
import { Redirect, useLocalSearchParams } from "expo-router"
import { ScrollView, StatusBar } from "react-native";
import { View } from "react-native";

const ArtistDetailScreen = () => {
    const { name: artistName } = useLocalSearchParams<{ name: string }>();
    const artists = useArtists()

    const artist = artists.find((artist) => artist.name === artistName);

    if (!artist) {
        console.warn(`This Artist not found: ${artistName}`);
        return <Redirect href={'/(tabs)/artists'} />
    }
    return (
        <View style={defaultStyles.container}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />

            <ScrollView
                style={{ paddingHorizontal: screenPadding.horizantal }}
            >
                <ArtistTrackList artist={artist} />

            </ScrollView>
        </View>
    )
}
export default ArtistDetailScreen;