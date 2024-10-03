import { PropsWithChildren } from "react";
import { View } from "react-native";


export const StopPropagation = ({ children }: PropsWithChildren) => {

    // bu kodlamalar oynatılmayan şarkının seçeneklerine erişmek istediğimiz zaman otomatik oynatmaması adına yazılmıştır.
    return <View
        onStartShouldSetResponder={() => true}
        onTouchEnd={(e) => e.stopPropagation()}
    >
        {children}
    </View>
}