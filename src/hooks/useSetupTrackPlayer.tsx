import { useEffect, useRef } from "react";
import TrackPlayer, { RepeatMode } from "react-native-track-player"


const setupPlayer = async () => {
    
    await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 10,

    });
    await TrackPlayer.setVolume(0.1); // 10% volume, not too loud
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    await TrackPlayer.play(); // Start playing
    

}
const cleanupPlayer = async () => {
    await TrackPlayer.reset();
  };

export const useSetupTrackPlayer = ({ onLoad }: { onLoad: () => void }) => {
    const isInitalized = useRef(false);


    useEffect(() => {
        setupPlayer().then(() => {
            onLoad?.();
        })
            .catch((e) => {
                isInitalized.current = false;
                console.log("Error setting up player", e)
                cleanupPlayer();
            })
    })
}