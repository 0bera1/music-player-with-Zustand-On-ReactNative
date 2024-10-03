import { useEffect } from "react";
import Animated, {
    cancelAnimation,
    Easing,
    StyleProps,
    useAnimatedStyle,
    useSharedValue,
    withDelay, withRepeat,
    withTiming
} from "react-native-reanimated"


export type MovingTextProps = {
    text: string,
    animationThreshold: number, // Animasyonun başlaması için gereken text uzunluğu.
    style?: StyleProps,
}

export const MovingText = ({ text, animationThreshold, style }:
    MovingTextProps) => { 
    const translateX = useSharedValue(0); 
    const shouldAnimate = text.length >= animationThreshold;
    // Eğer text uzunluğu animationThreshold'dan büyükse animasyonu başlat.

    const textWidth = text.length * 3; // text uzunluğunu 3 ile çarp. (3 harf = 1 birim)

    useEffect(() => {
        if (!shouldAnimate) return; // Eğer text animasyonu başlamamışsa return yap.

        translateX.value = withDelay(
            1200,
            withRepeat(withTiming(
                -textWidth, {
                duration: 4000,
                easing: Easing.linear
            }),// -textWidth anlamı textWidth kadar sola kaydır.
                // 5000 anlamı 5 saniye sürecek.
                // Easing.linear anlamı doğrusal hareket.
                // withRepeat anlamı tekrar et.
                -1, // -1 anlamı sonsuza kadar tekrar et.
                true //true anlamı doğrusal olarak tekrar et.
            )
        )

        return () => {
            cancelAnimation(translateX);
            translateX.value = 0;
        } // Eğer animasyon başlamışsa ve component kaldırılmışsa animasyonu iptal et.
    }, [shouldAnimate, translateX, animationThreshold, textWidth, text])
    // Eğer shouldAnimate, translateX, animationThreshold, textWidth, text değişirse useEffect çalıştır.

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }], // translateX değeri kadar sola kaydır.
        }
    })





    return (
        <Animated.Text
            numberOfLines={1}
            style={[style,
                animatedStyle,
                shouldAnimate && {
                    width: 9999, //elips şekilde görünmeyi engelliyor.
                    paddingLeft: 15, // textin başlangıç noktası.
                }]}
        >
            {text}
        </Animated.Text>
    )// Text componentini döndür.
    // Eğer shouldAnimate true ise style'a width ve paddingLeft ekler.
}