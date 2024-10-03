import { useCallback, useEffect, useState } from "react"
import TrackPlayer, { RepeatMode } from "react-native-track-player"


export const useTrackPlayerRepeatMode = () => {
    const [repeatMode, setRepeatMode] = useState<RepeatMode>(); // şunu ifade eder: tekrar modunu ayarla

    const changeRepeatMode = useCallback(async (repeatMode: RepeatMode) => { // şunu ifade eder: tekrar modunu değiştir
    await TrackPlayer.setRepeatMode(repeatMode) // şunu ifade eder: tekrar modunu ayarla

    setRepeatMode(repeatMode) // bu sayede repeatMode değeri değişir
}, [])

useEffect(() => {
    TrackPlayer.getRepeatMode().then(setRepeatMode)
}, []) // useeffect ile repeatMode değeri değişir ve setRepeatMode fonksiyonu çalışır

return { repeatMode, changeRepeatMode }
}