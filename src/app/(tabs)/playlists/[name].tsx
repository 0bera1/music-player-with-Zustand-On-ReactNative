import PlaylistTracksList from "@/components/PlaylistTracksList"
import { screenPadding } from "@/constants/tokens"
import { usePlaylists } from "@/store/library"
import { defaultStyles } from "@/styles"
import { Redirect, useLocalSearchParams } from "expo-router"
import { ScrollView, View } from "react-native"

const PlaylistScreen = () => {
    const {name: playlistName}= useLocalSearchParams<{name: string}>()
    const {playlists}= usePlaylists()

    const playlist = playlists.find((playlist) => playlist.name === playlistName)

    if (!playlist){
        console.warn(`Playlist with name ${playlistName} not found`)
        return <Redirect href={`/(tabs)/playlists`} />
    }
    
    return (
        <View style={defaultStyles.container}
        >
            
            <ScrollView
            contentInsetAdjustmentBehavior='automatic' // iOS only
            style={{paddingHorizontal: screenPadding.horizantal}}
            >
                <PlaylistTracksList playlist={playlist} /> 

            </ScrollView>
        </View>
    )

}

export default PlaylistScreen