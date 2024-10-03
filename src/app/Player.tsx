import { colors, fontSizes, screenPadding } from "@/constants/tokens";
import { defaultStyles, utilsStyles } from "@/styles";
import { View, StyleSheet, Animated, Modal, ActivityIndicator, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { memo, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useActiveTrack } from "react-native-track-player";
import FastImage from "react-native-fast-image";
import { unknownTrackImageUri } from "@/constants/images";
import { MovingText } from "@/components/MovingText";
import { FontAwesome } from '@expo/vector-icons';
import { PlayerControls } from "@/components/PlayerControls";
import { PlayerProgressBar } from "@/components/PlayerProgressBar";
import { PlayerVolumeBar } from "@/components/PlayerVolumeBar";
import { PlayerRepeatToogle } from "@/components/PlayerRepeatToogle";
import { useFavorite } from "@/store/library";
import { useTrackPlayerFavorite } from "@/hooks/useTrackPlayerFavorite";

// memo: component yeniden render edildiğinde, yalnızca props değiştiğinde güncellenir
const PlayerScreen = memo(() => {
    // Safe area insets (cihazın üst, alt boşlukları) alınır
    const { top, bottom } = useSafeAreaInsets();

    const {isFavorite, toggleFavorite} = useTrackPlayerFavorite();

    // Modal'ın görünürlüğünü kontrol eden state
    const [modalVisible, setModalVisible] = useState(true);

    // Modal'ı yeniden render etmek için kullanılan bir key
    const [key, setKey] = useState(0);

    // Expo'nun route (sayfa yönlendirme) fonksiyonu
    const router = useRouter();

    // TranslateY animasyonu için Animated.Value oluşturuluyor
    const [translateY] = useState(new Animated.Value(0));

    // Şu an çalan parçanın bilgilerini almak için hook
    const activeTrack = useActiveTrack();

    // useEffect ile modal görünürlüğü değiştiğinde işlemler yapılır
    useEffect(() => {
        if (!modalVisible) {
            // Modal kapandığında key artırılarak render yenilenir
            setKey(prevKey => prevKey + 1);
        }
    }, [modalVisible]); // modalVisible değiştiğinde çalışır

    // Modal'ı kapatma işlemi
    const closeModal = () => {
        setModalVisible(false);
    };

    // Eğer aktif parça yoksa loading (yükleniyor) ekranı göster
    if (!activeTrack) {
        return (
            <View style={[defaultStyles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator color={colors.primary} />
            </View>
        );
    }

    // Kaydırma hareketi başladığında çalışacak fonksiyon (PanGestureHandler için)
    const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
        const { translationY } = event.nativeEvent;

        // Kaydırma hareketi boyunca translateY animasyon değeri güncellenir
        translateY.setValue(translationY);
    };

    // Kaydırma bittiğinde çalışacak fonksiyon (PanGestureHandler için)
    const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
        const { translationY, state } = event.nativeEvent;

        // Kaydırma bitiş durumu kontrol edilir
        if (state === State.END) {
            if (translationY > 250) {
                // Eğer yeterince kaydırıldıysa modal kapanır
                Animated.timing(translateY, {
                    toValue: 800, // Ekrandan tamamen çıkacak bir değer
                    duration: 400,
                    useNativeDriver: true,
                }).start(() => router.back()); // Animasyon sonunda önceki ekrana döner
            } else {
                // Kaydırma yeterli değilse geri döndürülür
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }).start();
            }
        }
    };

    return (
        <>
            {/* Eğer modal görünürse bu component render edilir */}
            {modalVisible && (
                <Modal
                    key={key} // Key ile modal yeniden render edilir
                    animationType="slide" // Modal açılırken slide animasyonu uygulanır
                    transparent={true} // Arkaplanı yarı şeffaf yapmak için
                    visible={modalVisible} // Modal'ın görünürlüğü kontrol edilir
                    onRequestClose={closeModal} // Android cihazlar için kapatma butonu
                    onDismiss={closeModal} // Modal kapanırken çalışacak fonksiyon
                >
                    {/* Status bar gizlenir */}
                    <StatusBar hidden={true} backgroundColor={colors.background} style="auto" translucent />
                    {/* Kaydırma hareketleri için GestureHandler kullanılmaktadır */}
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <PanGestureHandler
                            onGestureEvent={onGestureEvent} // Kaydırma olayı
                            onHandlerStateChange={onHandlerStateChange} // Kaydırma durumu değiştiğinde
                        >
                            <Animated.View style={[styles.overlayContainer, { transform: [{ translateY }] }]}>
                                {/* Ekranın üstünde kaydırma sembolü */}
                                <DismissPlayerSymbol />
                                <View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
                                    <View style={styles.artWorkImageContainer}>
                                        {/* Parçaya ait görsel */}
                                        <FastImage source={{
                                            uri: activeTrack.artwork ?? unknownTrackImageUri,
                                            priority: FastImage.priority.high
                                        }}
                                            resizeMode="cover"
                                            style={styles.artWorkImage}
                                        />
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <View style={{ marginTop: 'auto' }}>
                                            {/* Parça başlığı */}
                                            <View style={{ height: 60 }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}>
                                                    {/* Hareketli parça başlığı */}
                                                    <View style={styles.trackTitleContainer}>
                                                        <MovingText text={activeTrack.title ?? ''}
                                                            animationThreshold={30}
                                                            style={styles.trackTitleTxt} />
                                                    </View>

                                                    {/* Favori butonu */}
                                                    <FontAwesome
                                                        name={isFavorite ? 'heart' : 'heart-o'} // Favori durumuna göre ikon değişir
                                                        size={24}
                                                        color={colors.primary}
                                                        style={{ marginHorizontal: 14 }}
                                                        onPress={toggleFavorite} // Butona basıldığında favori durumu değişir
                                                    />
                                                </View>

                                                {/* Sanatçı ismi */}
                                                <Text
                                                    numberOfLines={1}
                                                    style={styles.trackArtistTxt}
                                                >
                                                    {activeTrack.artist ?? 'Unknown Artist'}
                                                </Text>
                                            </View>

                                            {/* Çalma ilerleme barı */}
                                            <PlayerProgressBar style={{ marginTop: 32 }} />

                                            {/* Çalma kontrol butonları */}
                                            <PlayerControls style={{ marginTop: 40, }} />
                                        </View>

                                        {/* Ses kontrol barı */}
                                        <PlayerVolumeBar style={{
                                            marginTop: 'auto',
                                            marginBottom: 30,
                                        }} />

                                        {/* Tekrar modu butonu */}
                                        <View style={utilsStyles.centredRow}>
                                            <PlayerRepeatToogle size={30}
                                                style={{ marginVertical: 24 }} />
                                        </View>
                                    </View>
                                </View>
                            </Animated.View>
                        </PanGestureHandler>
                    </GestureHandlerRootView>
                </Modal>
            )}
        </>
    );
});

// Modal kaydırma sembolü
const DismissPlayerSymbol = () => {
    const { top } = useSafeAreaInsets(); // Cihazın üst boşluğu alınır
    return (
        <View style={{
            position: 'absolute',
            top: top + 10,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            elevation: 4, // Android için gölge efekti
        }}>
            <View accessible={false} // Erişilebilirlik gereksinimi olmayan sembol
                style={{
                    width: 50,
                    height: 5,
                    borderRadius: 8,
                    backgroundColor: 'white',
                    opacity: 0.8, // Görsel şeffaflık
                    elevation: 4 // Gölge efekti
                }}
            />
        </View>
    );
}



const styles = StyleSheet.create({
    overlayContainer: {
        ...defaultStyles.container,
        paddingHorizontal: screenPadding.horizantal,
        backgroundColor: 'rgba(0,0,0,0.9)',
        zIndex: 1,
        elevation: 25,
    },
    artWorkImageContainer: {
        elevation: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        height: '45%'
    },
    artWorkImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 15,
        elevation: 40
    },
    trackTitleContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    trackTitleTxt: {
        ...defaultStyles.text,
        fontSize: 22,
        fontWeight: '700',
    },
    trackArtistTxt: {
        ...defaultStyles.text,
        fontSize: fontSizes.sm,
        fontWeight: '400',
        color: colors.textMuted,
        marginTop: 6,
        opacity: 0.8,
        maxWidth: '90%'
    }
})

export default PlayerScreen;
