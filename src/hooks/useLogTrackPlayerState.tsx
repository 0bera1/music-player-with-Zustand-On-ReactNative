import { Event, useTrackPlayerEvents } from "react-native-track-player";

const events= [Event.PlaybackState, Event.PlaybackError, Event.PlaybackActiveTrackChanged]

export const useLogTrackPlayerState = () => {
    useTrackPlayerEvents(events, (event) => {
        if(event.type === Event.PlaybackError){
            console.warn('An error occurred', event)
        }

        if (event.type === Event.PlaybackState) {
            console.log('State changed', event.state)
        }

        if (event.type === Event.PlaybackActiveTrackChanged) {
            console.log('Active track changed', event.index)
        }
    })
}
