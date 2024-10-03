import { useCallback, useEffect, useState } from "react";
import TrackPlayer from "react-native-track-player";

export const useTrackPlayerVolume = () => {
    const [volume, setVolume] = useState<number | undefined>(undefined); // ses seviyesini tutar

    const getVolume = useCallback(async () => {
        const currentVolume = await TrackPlayer.getVolume(); // kullanıcının ses seviyesini getirir
        setVolume(currentVolume); // ses seviyesini günceller
    }, []);

    const updateVolume = useCallback(async (newValume: number) => {
        if (newValume <0 || newValume > 1) return; // ses seviyesi 0 ile 1 arasında olmalıdır

        setVolume(newValume); // ses seviyesini günceller

        await TrackPlayer.setVolume(newValume); // ses seviyesini günceller
        
    }, []);

    useEffect(() => { // ses seviyesini getirir
        getVolume(); 
    }, [getVolume]); 
 // use effect ile şunu sağlarız: ses seviyesi değiştiğinde getVolume fonksiyonunu çalıştırır   

    

    return { volume, /*getVolume*/ updateVolume };
}