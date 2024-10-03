
export const formatSecondsToMinutes = (seconds: number) => {
    const minutes = Math.floor(seconds / 60); // saniyeyi dakikaya çevirir
    const remainingSeconds = Math.floor(seconds % 60); // saniye cinsinden kalan süreyi hesaplar

    const formattedMinutes = String(minutes).padStart(2, '0'); // dakikayı 2 haneli hale getirir
    const formattedSeconds = String(remainingSeconds).padStart(2, '0'); // saniyeyi 2 haneli hale getirir

    return `${formattedMinutes}:${formattedSeconds}`; // dakika ve saniyeyi birleştirir
};

export const generateTrackListId = (trackListName: string, search?: string) => {
    return `${trackListName}${`-${search}` || ''}`; // trackListName ve search değerlerini birleştirir
    // Bu sayede her bir trackList'in id'si farklı olur ve her bir trackList'in scroll pozisyonu ayrı ayrı saklanır
    // ve hangi tracklistteysen sadece oradaki şarkılar oynatılır
}