import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { colors, fontSizes } from "./tokens";

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
    headerTitleStyle: {
        color: colors.textMuted, // Büyük başlık metin rengi
        fontSize:fontSizes.tit,
        fontWeight:'bold',        
    },
    headerTintColor: colors.textMuted, // İkon rengi (geri butonu ve diğer ikonlar)
    headerTransparent: true, // Header arka planını sayfada görünecek şekilde ayarlayın
    statusBarTranslucent: true, // StatusBar'ı sayfanın içine alın
    headerShadowVisible: true, // Gölge görünümünü kapat
    
};
